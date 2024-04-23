//SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

interface IWETH {
    function deposit() external payable;
    function withdraw(uint) external;
    function totalSupply() external view returns (uint256);
    function approve(address, uint) external returns(bool);
    function transfer(address, uint) external returns(bool);
    function transferFrom(address, address, uint) external returns(bool);
    function balanceOf(address) external view returns(uint);
    function allowance(address,uint) external returns(bool);

    event Transfer(address indexed,address indexed,uint);
    event Approve(address indexed,address indexed,uint);
}