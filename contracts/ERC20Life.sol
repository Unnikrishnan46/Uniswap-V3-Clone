// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LifeToken is ERC20{
    constructor() ERC20("Life","LF"){
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}