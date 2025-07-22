// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// HexisBooth Contract
// Users own and sell content, managing their earnings.
contract HexisBooth is Ownable {
    // Address to receive fees (hardcoded)
    address public immutable FEE_RECEIVER = 0x9398084E888CB5B5c126240439054b57C10138E7;

    // --- Enum Definitions ---
    enum SaleType {
        InstantSale, // Available for immediate purchase
        RequestSale  // Requires a purchase request
    }

    enum PaymentOption {
        NativeCurrency, // ETH or the chain's native currency
        ERC20Token      // A specific ERC20 token
    }

    // --- State Variables ---
    string public previewText; // Public preview text
    uint256 public price; // Content price
    address public paymentTokenAddress; // ERC20 token address for payment (address(0) if PaymentOption.NativeCurrency)
    PaymentOption public currentPaymentOption; // Current payment option (changed to enum)

    bool public saleStarted; // Indicates if the sale has started
    SaleType public currentSaleType; // Current sale type

    // Content purchasers (mapping: buyer address => purchase status/approval status)
    mapping(address => bool) public hasAccess;
    mapping(address => bool) public hasRequested;
    mapping(address => bool) public isApprovedToBuy;

    // Withdrawable balance (after fee calculation)
    mapping(address => uint256) public withdrawableBalance;

    // --- Events ---
    event PreviewTextUpdated(string newPreviewText);
    event PriceUpdated(uint256 newPrice);
    event SaleStarted(SaleType saleType);
    event ContentPurchased(address indexed buyer, uint256 amountPaid, address indexed tokenAddress, PaymentOption paymentOption, SaleType saleType); // Changed event arguments
    event PurchaseRequested(address indexed requester, string contactInfo);
    event RequestApproved(address indexed requester);
    event FundsCheckedOut(address indexed owner, uint256 grossAmount, uint256 feeAmount, uint256 netAmount, PaymentOption paymentOption); // Changed event arguments
    event FundsWithdrawn(address indexed owner, uint256 amount, PaymentOption paymentOption); // Changed event arguments

    // --- Constructor ---
    constructor(
        address ownerAddress,
        string memory _previewText,
        uint256 _price,
        PaymentOption _paymentOption, // Changed to PaymentOption enum
        address _paymentTokenAddress, // Token address if ERC20
        SaleType _saleType
    ) Ownable(ownerAddress) {
        // Validate payment option
        if (_paymentOption == PaymentOption.NativeCurrency) {
            require(_paymentTokenAddress == address(0), "ERC20 token address must be zero for NativeCurrency.");
        } else if (_paymentOption == PaymentOption.ERC20Token) {
            require(_paymentTokenAddress != address(0), "ERC20 token address cannot be zero for ERC20Token.");
        }

        previewText = _previewText;
        price = _price;
        currentPaymentOption = _paymentOption;
        paymentTokenAddress = _paymentTokenAddress;
        currentSaleType = _saleType;
        saleStarted = false;
    }

    // --- Seller (Owner) Functions ---

    function updatePreviewText(string memory _newPreviewText) public onlyOwner {
        require(!saleStarted, "Sale has already started.");
        previewText = _newPreviewText;
        emit PreviewTextUpdated(_newPreviewText);
    }

    function updatePrice(uint256 _newPrice) public onlyOwner {
        require(!saleStarted, "Sale has already started.");
        price = _newPrice;
        emit PriceUpdated(_newPrice);
    }

    function startSale() public onlyOwner {
        require(!saleStarted, "Sale already started.");
        saleStarted = true;
        emit SaleStarted(currentSaleType);
    }

    function approveRequest(address _requester) public onlyOwner {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.RequestSale, "This is not a request sale type.");
        require(hasRequested[_requester], "No purchase request from this address.");
        require(!isApprovedToBuy[_requester], "Request already approved.");

        isApprovedToBuy[_requester] = true;
        emit RequestApproved(_requester);
    }

    // --- Buyer/User Functions ---

    // Common purchase logic (internal helper)
    function _processPurchase(address buyer) internal {
        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            require(msg.value == price, "Incorrect Native Currency amount sent.");
            // Native Currency is automatically transferred to the contract address.
        } else { // ERC20Token
            require(msg.value == 0, "Do not send Native Currency with ERC20 payment.");
            IERC20 token = IERC20(paymentTokenAddress);
            require(token.transferFrom(buyer, address(this), price), "ERC20 Token transfer failed. Check allowance.");
        }
        hasAccess[buyer] = true;
    }

    // Buys content and gains access in instant sale type.
    function buyInstant() public payable {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.InstantSale, "This is not an instant sale type. Use requestPurchase().");
        require(!hasAccess[_msgSender()], "You already have access.");

        _processPurchase(_msgSender());
        emit ContentPurchased(_msgSender(), price, paymentTokenAddress, currentPaymentOption, currentSaleType);
    }

    // Sends a purchase request in request sale type.
    function requestPurchase(string memory _contactInfo) public {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.RequestSale, "This is not a request sale type. Use buyInstant().");
        require(!hasRequested[_msgSender()], "You have already requested purchase.");

        hasRequested[_msgSender()] = true;
        emit PurchaseRequested(_msgSender(), _contactInfo);
    }

    // Buys content and gains access after approval in request sale type.
    function buyApproved() public payable {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.RequestSale, "This is not a request sale type.");
        require(isApprovedToBuy[_msgSender()], "Your purchase request has not been approved yet.");
        require(!hasAccess[_msgSender()], "You already have access.");

        _processPurchase(_msgSender());
        emit ContentPurchased(_msgSender(), price, paymentTokenAddress, currentPaymentOption, currentSaleType);
    }

    // --- Settlement and Withdrawal ---

    // Calculates sales and fees, then updates the withdrawable balance.
    function checkOut() public onlyOwner {
        uint256 totalBalance;
        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            totalBalance = address(this).balance;
        } else { // ERC20Token
            totalBalance = IERC20(paymentTokenAddress).balanceOf(address(this));
        }

        require(totalBalance > 0, "No funds to checkout.");

        uint256 feeAmount = (totalBalance * 2) / 100; // 2% fee
        uint256 netAmount = totalBalance - feeAmount;

        withdrawableBalance[_msgSender()] += netAmount;

        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            payable(FEE_RECEIVER).transfer(feeAmount);
        } else {
            IERC20(paymentTokenAddress).transfer(FEE_RECEIVER, feeAmount);
        }

        emit FundsCheckedOut(_msgSender(), totalBalance, feeAmount, netAmount, currentPaymentOption);
    }

    // Withdraws the checked-out amount.
    function withdraw() public onlyOwner {
        uint256 amount = withdrawableBalance[_msgSender()];
        require(amount > 0, "No withdrawable balance.");

        withdrawableBalance[_msgSender()] = 0;

        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            (bool success, ) = payable(_msgSender()).call{value: amount}("");
            require(success, "Native Currency transfer failed.");
        } else {
            require(IERC20(paymentTokenAddress).transfer(_msgSender(), amount), "ERC20 Token transfer failed.");
        }

        emit FundsWithdrawn(_msgSender(), amount, currentPaymentOption);
    }
}
