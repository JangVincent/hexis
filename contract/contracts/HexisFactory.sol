// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./HexisBooth.sol";

contract HexisFactory is Ownable {
    // Events
    event BoothCreated(address indexed boothAddress, address indexed owner);

    // Counts
    uint256 public boothCount;

    // Create a new HexisBooth contract
    function createHexisBooth(
        address ownerAddress,
        string memory previewText,
        uint256 price,
        HexisBooth.PaymentOption paymentOption,
        address paymentTokenAddress,
        HexisBooth.SaleType saleType
    ) public returns (HexisBooth) {
        HexisBooth newBooth = new HexisBooth(
            ownerAddress,
            previewText,
            price,
            paymentOption,
            paymentTokenAddress,
            saleType
        );
        emit BoothCreated(address(newBooth), ownerAddress);
        boothCount++;
        return newBooth;
    }
}