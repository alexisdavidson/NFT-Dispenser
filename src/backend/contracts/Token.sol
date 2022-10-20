// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("PORK Coin", "PC") {
        // Mint 36,665 tokens
        _mint(address(this), 36665 * 10**uint(decimals()));
    }
}