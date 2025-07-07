// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// HexisBooth 컨트랙트
// 사용자들이 소유하고 콘텐츠를 판매하며 수익을 관리합니다.
contract HexisBooth is Ownable {
    // 수수료를 받을 주소 (하드코딩)
    address public immutable FEE_RECEIVER = 0x9398084E888CB5B5c126240439054b57C10138E7;

    // --- Enum 정의 ---
    enum SaleType {
        InstantSale, // 즉시 구매 가능
        RequestSale  // 구매 요청 필요
    }

    enum PaymentOption {
        NativeCurrency, // ETH 또는 체인의 기본 통화
        ERC20Token      // 특정 ERC20 토큰
    }

    // --- 상태 변수 ---
    string public previewText; // 공개 미리보기 텍스트
    uint256 public price; // 콘텐츠 가격
    address public paymentTokenAddress; // 결제에 사용될 ERC20 토큰 주소 (PaymentOption.NativeCurrency면 address(0))
    PaymentOption public currentPaymentOption; // 현재 결제 옵션 (enum으로 변경)

    bool public saleStarted; // 판매 시작 여부
    SaleType public currentSaleType; // 현재 판매 타입

    // 콘텐츠 구매자 (mapping: 구매자 주소 => 구매 여부/승인 여부)
    mapping(address => bool) public hasAccess;
    mapping(address => bool) public hasRequested;
    mapping(address => bool) public isApprovedToBuy;

    // 출금 가능한 잔액 (fee 계산 후)
    mapping(address => uint256) public withdrawableBalance;

    // --- 이벤트 ---
    event PreviewTextUpdated(string newPreviewText);
    event PriceUpdated(uint256 newPrice);
    event SaleStarted(SaleType saleType);
    event ContentPurchased(address indexed buyer, uint256 amountPaid, address indexed tokenAddress, PaymentOption paymentOption, SaleType saleType); // 이벤트 인자 변경
    event PurchaseRequested(address indexed requester, string contactInfo);
    event RequestApproved(address indexed requester);
    event FundsCheckedOut(address indexed owner, uint256 grossAmount, uint256 feeAmount, uint256 netAmount, PaymentOption paymentOption); // 이벤트 인자 변경
    event FundsWithdrawn(address indexed owner, uint256 amount, PaymentOption paymentOption); // 이벤트 인자 변경

    // --- 생성자 ---
    constructor(
        address ownerAddress,
        string memory _previewText,
        uint256 _price,
        PaymentOption _paymentOption, // PaymentOption enum으로 변경
        address _paymentTokenAddress, // ERC20인 경우 토큰 주소
        SaleType _saleType
    ) Ownable(ownerAddress) {
        // 결제 옵션 검증
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

    // --- 판매자(Owner) 함수 ---

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

    // --- 구매자/사용자 함수 ---

    // 공통 구매 로직 (internal helper)
    function _processPurchase(address buyer) internal {
        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            require(msg.value == price, "Incorrect Native Currency amount sent.");
            // Native Currency는 컨트랙트 주소로 자동 전송됩니다.
        } else { // ERC20Token
            require(msg.value == 0, "Do not send Native Currency with ERC20 payment.");
            IERC20 token = IERC20(paymentTokenAddress);
            require(token.transferFrom(buyer, address(this), price), "ERC20 Token transfer failed. Check allowance.");
        }
        hasAccess[buyer] = true;
    }

    // instant sale 타입에서 콘텐츠를 구매하고 접근 권한을 얻습니다.
    function buyInstant() public payable {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.InstantSale, "This is not an instant sale type. Use requestPurchase().");
        require(!hasAccess[_msgSender()], "You already have access.");

        _processPurchase(_msgSender());
        emit ContentPurchased(_msgSender(), price, paymentTokenAddress, currentPaymentOption, currentSaleType);
    }

    // request sale 타입에서 구매 요청을 보냅니다.
    function requestPurchase(string memory _contactInfo) public {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.RequestSale, "This is not a request sale type. Use buyInstant().");
        require(!hasRequested[_msgSender()], "You have already requested purchase.");

        hasRequested[_msgSender()] = true;
        emit PurchaseRequested(_msgSender(), _contactInfo);
    }

    // request sale 타입에서 승인된 후 콘텐츠를 구매하고 접근 권한을 얻습니다.
    function buyApproved() public payable {
        require(saleStarted, "Sale has not started.");
        require(currentSaleType == SaleType.RequestSale, "This is not a request sale type.");
        require(isApprovedToBuy[_msgSender()], "Your purchase request has not been approved yet.");
        require(!hasAccess[_msgSender()], "You already have access.");

        _processPurchase(_msgSender());
        emit ContentPurchased(_msgSender(), price, paymentTokenAddress, currentPaymentOption, currentSaleType);
    }

    // --- 정산 및 출금 ---

    // 매출 및 수수료를 계산하여 출금 가능한 잔액을 업데이트합니다.
    function checkOut() public onlyOwner {
        uint256 totalBalance;
        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            totalBalance = address(this).balance;
        } else { // ERC20Token
            totalBalance = IERC20(paymentTokenAddress).balanceOf(address(this));
        }

        require(totalBalance > 0, "No funds to checkout.");

        uint256 feeAmount = (totalBalance * 2) / 100; // 2% 수수료
        uint256 netAmount = totalBalance - feeAmount;

        withdrawableBalance[_msgSender()] += netAmount;

        if (currentPaymentOption == PaymentOption.NativeCurrency) {
            payable(FEE_RECEIVER).transfer(feeAmount);
        } else {
            IERC20(paymentTokenAddress).transfer(FEE_RECEIVER, feeAmount);
        }

        emit FundsCheckedOut(_msgSender(), totalBalance, feeAmount, netAmount, currentPaymentOption);
    }

    // checkOut된 금액을 인출합니다.
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