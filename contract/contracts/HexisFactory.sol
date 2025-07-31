// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./HexisBooth.sol";

contract HexisFactory is Ownable {
    event BoothCreated(address indexed boothAddress, address indexed owner);

    address public immutable hexisBoothImplementation;
    address public feeReceiver;
    uint256 public boothCount;

    constructor(
        address ownerAddress,
        address _hexisBoothImplementation, // 1단계에서 배포한 HexisBooth 주소
        address _feeReceiver
    ) Ownable(ownerAddress) {
        hexisBoothImplementation = _hexisBoothImplementation;
        feeReceiver = _feeReceiver;
    }
    
    function setFeeReceiver(address _newFeeReceiver) public onlyOwner {
        feeReceiver = _newFeeReceiver;
    }

    function createHexisBooth(
        address ownerAddress,
        string memory previewText,
        uint256 price,
        HexisBooth.PaymentOption paymentOption,
        address paymentTokenAddress,
        HexisBooth.SaleType saleType
    ) public returns (address) {
        address newBoothAddress = Clones.clone(hexisBoothImplementation);

        HexisBooth(newBoothAddress).initialize(
            ownerAddress,
            previewText,
            price,
            paymentOption,
            paymentTokenAddress,
            saleType,
            feeReceiver // feeReceiver 주소 전달
        );

        emit BoothCreated(newBoothAddress, ownerAddress);
        boothCount++;
        return newBoothAddress;
    }
}