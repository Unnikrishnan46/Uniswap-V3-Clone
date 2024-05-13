// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenTransfer {
    function transferToken(IERC20 token, address recipient, uint256 amount) public {
        require(token.balanceOf(msg.sender) >= amount, "Not enough tokens");
        require(token.allowance(msg.sender, address(this)) >= amount, "Contract not approved to transfer tokens");

        token.transferFrom(msg.sender, recipient, amount);
    }
}
