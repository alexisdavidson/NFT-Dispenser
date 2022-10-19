// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFT.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Dispenser is ERC721Holder, ReentrancyGuard, Ownable {
    NFT public nft;
    ERC20 public token;

    uint256 priceToPlay = 0.01 ether;
    
    event PlaySuccessful(
        uint256 tokenId,
        address nftAddress,
        address winnerAddress
    );

    constructor(address teamAddress, address nftAddress) {
        nft = NFT(nftAddress);
        _transferOwnership(teamAddress);
    }

    function play(uint256 _tokenId) external payable {
        // Pay tokens
        IERC20(token).transferFrom(msg.sender, address(this), priceToPlay);

        // Pick a random token ID from the NFT collection

        // Perform the mint
        nft.mint();

        // Mint success event
        emit PlaySuccessful(_tokenId, address(nft), msg.sender);
    }
}