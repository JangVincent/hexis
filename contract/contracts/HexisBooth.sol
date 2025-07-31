// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "solady/src/auth/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "solady/src/utils/SafeTransferLib.sol";



/**

++++   ++++  ++++++++  +++++  +++++  +++++   +++++++
++++   ++++  ++++++++  +++++  +++++  +++++  ++++++++
++++   ++++  ++++++++   ++++++++++   +++++ +++++++++
++++   ++++  ++++       ++++++++++   +++++ +++++ +++
++++   ++++  ++++        ++++++++    +++++ +++++    
+++++++++++  ++++++++    +++++++     +++++ +++++++  
+++++++++++  ++++++++     ++++++     +++++  +++++++ 
+++++++++++  ++++++++     ++++++     +++++   +++++++
+++++++++++  +++++++     +++++++     +++++    ++++++
++++   ++++  ++++        ++++++++    +++++      ++++
++++   ++++  ++++++++   ++++++++++   +++++ +++ +++++
++++   ++++  ++++++++  ++++++ ++++   +++++ +++++++++
++++   ++++  ++++++++  +++++  +++++  +++++ +++++++++
++++   ++++  ++++++++  +++++   +++++ +++++ +++++++  

 * 
 * @title HexisBooth (Testnet)
 * @author aiiiden (𝕏 : @aiiiden0)
 * @notice A contract for managing content sales with both instant and request-based purchase options.
 * @dev This is a template contract that can be cloned by the HexisFactory.
 */

contract HexisBooth is Ownable {
    address public FEE_RECEIVER;
    enum SaleType { InstantSale, RequestSale }
    enum PaymentOption { NativeCurrency, ERC20Token }

    string public previewText;
    uint256 public price;
    address public paymentTokenAddress;
    PaymentOption public currentPaymentOption;
    bool public saleStarted;
    SaleType public currentSaleType;

    mapping(address => bool) public hasAccess;
    mapping(address => bool) public hasRequested;
    mapping(address => bool) public isApprovedToBuy;

    mapping(address => uint256) public withdrawableBalance;
    uint256 public settledBalance;
    event PreviewTextUpdated(string newPreviewText);
    event PriceUpdated(uint256 newPrice);
    event SaleStarted(SaleType saleType);
    event ContentPurchased(address indexed buyer, uint256 amountPaid, address indexed tokenAddress, PaymentOption paymentOption, SaleType saleType);
    event PurchaseRequested(address indexed requester, string contactInfo);
    event RequestApproved(address indexed requester);
    event FundsCheckedOut(address indexed owner, uint256 grossAmount, uint256 feeAmount, uint256 netAmount, PaymentOption paymentOption);
    event FundsWithdrawn(address indexed owner, uint256 amount, PaymentOption paymentOption);

    constructor() {}

    function initialize(
        address ownerAddress,
        string memory _previewText,
        uint256 _price,
        PaymentOption _paymentOption,
        address _paymentTokenAddress,
        SaleType _saleType,
        address _feeReceiver
    ) public {
        require(owner() == address(0), "Already initialized");
        _initializeOwner(ownerAddress);

        if (_paymentOption == PaymentOption.NativeCurrency) {
            require(_paymentTokenAddress == address(0), "ERC20 address must be zero for NativeCurrency");
        } else if (_paymentOption == PaymentOption.ERC20Token) {
            require(_paymentTokenAddress != address(0), "ERC20 address cannot be zero for ERC20Token");
        }
        
        FEE_RECEIVER = _feeReceiver;
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
    function _processPurchase(address buyer) internal {
        hasAccess[buyer] = true;
        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            require(msg.value == price, "Incorrect Native Currency amount sent.");
        } else {
            require(msg.value == 0, "Do not send Native Currency with ERC20 payment.");
            SafeTransferLib.safeTransferFrom(paymentTokenAddress, buyer, address(this), price);
        }
    }

    function buyInstant() public payable {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.InstantSale, "This is not an instant sale type. Use requestPurchase().");
        require(!hasAccess[msg.sender], "You already have access.");
        _processPurchase(msg.sender);
        emit ContentPurchased(msg.sender, price, paymentTokenAddress, currentPaymentOption, currentSaleType);
    }

    function requestPurchase(string memory _contactInfo) public {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.RequestSale, "This is not a request sale type. Use buyInstant().");
        require(!hasRequested[msg.sender], "You have already requested purchase.");
        hasRequested[msg.sender] = true;
        emit PurchaseRequested(msg.sender, _contactInfo);
    }

    function buyApproved() public payable {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.RequestSale, "This is not a request sale type.");
        require(isApprovedToBuy[msg.sender], "Your purchase request has not been approved yet.");
        require(!hasAccess[msg.sender], "You already have access.");
        _processPurchase(msg.sender);
        emit ContentPurchased(msg.sender, price, paymentTokenAddress, currentPaymentOption, currentSaleType);
    }

    // --- Settlement and Withdrawal ---
    function checkOut() public onlyOwner {
        uint256 totalBalance;
        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            totalBalance = address(this).balance;
        } else {
            totalBalance = IERC20(paymentTokenAddress).balanceOf(address(this));
        }

        uint256 newFunds = totalBalance - settledBalance;
        require(newFunds > 0, "No new funds to checkout.");

        uint256 feeAmount = (newFunds * 2) / 100;
        uint256 netAmount = newFunds - feeAmount;

        withdrawableBalance[owner()] += netAmount;
        settledBalance = totalBalance - feeAmount;
        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            SafeTransferLib.forceSafeTransferETH(FEE_RECEIVER, feeAmount);
        } else {
            SafeTransferLib.safeTransfer(paymentTokenAddress, FEE_RECEIVER, feeAmount);
        }

        emit FundsCheckedOut(owner(), newFunds, feeAmount, netAmount, currentPaymentOption);
    }

    function withdraw() public onlyOwner {
        uint256 amount = withdrawableBalance[owner()];
        require(amount > 0, "No withdrawable balance.");
        withdrawableBalance[owner()] = 0;

        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            SafeTransferLib.forceSafeTransferETH(owner(), amount);
        } else {
            SafeTransferLib.safeTransfer(paymentTokenAddress, owner(), amount);
        }

        emit FundsWithdrawn(owner(), amount, currentPaymentOption);
    }
}