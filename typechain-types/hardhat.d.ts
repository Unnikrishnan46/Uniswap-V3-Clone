/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IUniswapV3MintCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3MintCallback__factory>;
    getContractFactory(
      name: "IUniswapV3SwapCallback",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3SwapCallback__factory>;
    getContractFactory(
      name: "IUniswapV3Factory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3Factory__factory>;
    getContractFactory(
      name: "IUniswapV3Pool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3Pool__factory>;
    getContractFactory(
      name: "IUniswapV3PoolActions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolActions__factory>;
    getContractFactory(
      name: "IUniswapV3PoolDerivedState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolDerivedState__factory>;
    getContractFactory(
      name: "IUniswapV3PoolEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolEvents__factory>;
    getContractFactory(
      name: "IUniswapV3PoolImmutables",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolImmutables__factory>;
    getContractFactory(
      name: "IUniswapV3PoolOwnerActions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolOwnerActions__factory>;
    getContractFactory(
      name: "IUniswapV3PoolState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolState__factory>;
    getContractFactory(
      name: "LiquidityManagement",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LiquidityManagement__factory>;
    getContractFactory(
      name: "PeripheryImmutableState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PeripheryImmutableState__factory>;
    getContractFactory(
      name: "PeripheryPayments",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PeripheryPayments__factory>;
    getContractFactory(
      name: "IWETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH9__factory>;
    getContractFactory(
      name: "IERC721Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Permit__factory>;
    getContractFactory(
      name: "INonfungiblePositionManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.INonfungiblePositionManager__factory>;
    getContractFactory(
      name: "IPeripheryImmutableState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPeripheryImmutableState__factory>;
    getContractFactory(
      name: "IPeripheryPayments",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPeripheryPayments__factory>;
    getContractFactory(
      name: "IPoolInitializer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPoolInitializer__factory>;
    getContractFactory(
      name: "ISwapRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwapRouter__factory>;
    getContractFactory(
      name: "BooToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BooToken__factory>;
    getContractFactory(
      name: "LifeToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LifeToken__factory>;
    getContractFactory(
      name: "IWETH",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH__factory>;
    getContractFactory(
      name: "LiquidityManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LiquidityManager__factory>;
    getContractFactory(
      name: "SwapMultiHop",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SwapMultiHop__factory>;
    getContractFactory(
      name: "SingleSwapToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SingleSwapToken__factory>;

    getContractAt(
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC721Enumerable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Enumerable>;
    getContractAt(
      name: "IERC721Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IUniswapV3MintCallback",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3MintCallback>;
    getContractAt(
      name: "IUniswapV3SwapCallback",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3SwapCallback>;
    getContractAt(
      name: "IUniswapV3Factory",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3Factory>;
    getContractAt(
      name: "IUniswapV3Pool",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3Pool>;
    getContractAt(
      name: "IUniswapV3PoolActions",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolActions>;
    getContractAt(
      name: "IUniswapV3PoolDerivedState",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolDerivedState>;
    getContractAt(
      name: "IUniswapV3PoolEvents",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolEvents>;
    getContractAt(
      name: "IUniswapV3PoolImmutables",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolImmutables>;
    getContractAt(
      name: "IUniswapV3PoolOwnerActions",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolOwnerActions>;
    getContractAt(
      name: "IUniswapV3PoolState",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolState>;
    getContractAt(
      name: "LiquidityManagement",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LiquidityManagement>;
    getContractAt(
      name: "PeripheryImmutableState",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.PeripheryImmutableState>;
    getContractAt(
      name: "PeripheryPayments",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.PeripheryPayments>;
    getContractAt(
      name: "IWETH9",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH9>;
    getContractAt(
      name: "IERC721Permit",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Permit>;
    getContractAt(
      name: "INonfungiblePositionManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.INonfungiblePositionManager>;
    getContractAt(
      name: "IPeripheryImmutableState",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IPeripheryImmutableState>;
    getContractAt(
      name: "IPeripheryPayments",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IPeripheryPayments>;
    getContractAt(
      name: "IPoolInitializer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IPoolInitializer>;
    getContractAt(
      name: "ISwapRouter",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwapRouter>;
    getContractAt(
      name: "BooToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BooToken>;
    getContractAt(
      name: "LifeToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LifeToken>;
    getContractAt(
      name: "IWETH",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH>;
    getContractAt(
      name: "LiquidityManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LiquidityManager>;
    getContractAt(
      name: "SwapMultiHop",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SwapMultiHop>;
    getContractAt(
      name: "SingleSwapToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SingleSwapToken>;

    deployContract(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Enumerable>;
    deployContract(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Metadata>;
    deployContract(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Receiver>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "IUniswapV3MintCallback",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3MintCallback>;
    deployContract(
      name: "IUniswapV3SwapCallback",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3SwapCallback>;
    deployContract(
      name: "IUniswapV3Factory",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3Factory>;
    deployContract(
      name: "IUniswapV3Pool",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3Pool>;
    deployContract(
      name: "IUniswapV3PoolActions",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolActions>;
    deployContract(
      name: "IUniswapV3PoolDerivedState",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolDerivedState>;
    deployContract(
      name: "IUniswapV3PoolEvents",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolEvents>;
    deployContract(
      name: "IUniswapV3PoolImmutables",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolImmutables>;
    deployContract(
      name: "IUniswapV3PoolOwnerActions",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolOwnerActions>;
    deployContract(
      name: "IUniswapV3PoolState",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolState>;
    deployContract(
      name: "LiquidityManagement",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LiquidityManagement>;
    deployContract(
      name: "PeripheryImmutableState",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PeripheryImmutableState>;
    deployContract(
      name: "PeripheryPayments",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PeripheryPayments>;
    deployContract(
      name: "IWETH9",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWETH9>;
    deployContract(
      name: "IERC721Permit",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Permit>;
    deployContract(
      name: "INonfungiblePositionManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.INonfungiblePositionManager>;
    deployContract(
      name: "IPeripheryImmutableState",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPeripheryImmutableState>;
    deployContract(
      name: "IPeripheryPayments",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPeripheryPayments>;
    deployContract(
      name: "IPoolInitializer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPoolInitializer>;
    deployContract(
      name: "ISwapRouter",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISwapRouter>;
    deployContract(
      name: "BooToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BooToken>;
    deployContract(
      name: "LifeToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LifeToken>;
    deployContract(
      name: "IWETH",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWETH>;
    deployContract(
      name: "LiquidityManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LiquidityManager>;
    deployContract(
      name: "SwapMultiHop",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SwapMultiHop>;
    deployContract(
      name: "SingleSwapToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SingleSwapToken>;

    deployContract(
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IERC721Enumerable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Enumerable>;
    deployContract(
      name: "IERC721Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Metadata>;
    deployContract(
      name: "IERC721",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "IERC721Receiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Receiver>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "IUniswapV3MintCallback",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3MintCallback>;
    deployContract(
      name: "IUniswapV3SwapCallback",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3SwapCallback>;
    deployContract(
      name: "IUniswapV3Factory",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3Factory>;
    deployContract(
      name: "IUniswapV3Pool",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3Pool>;
    deployContract(
      name: "IUniswapV3PoolActions",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolActions>;
    deployContract(
      name: "IUniswapV3PoolDerivedState",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolDerivedState>;
    deployContract(
      name: "IUniswapV3PoolEvents",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolEvents>;
    deployContract(
      name: "IUniswapV3PoolImmutables",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolImmutables>;
    deployContract(
      name: "IUniswapV3PoolOwnerActions",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolOwnerActions>;
    deployContract(
      name: "IUniswapV3PoolState",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUniswapV3PoolState>;
    deployContract(
      name: "LiquidityManagement",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LiquidityManagement>;
    deployContract(
      name: "PeripheryImmutableState",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PeripheryImmutableState>;
    deployContract(
      name: "PeripheryPayments",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.PeripheryPayments>;
    deployContract(
      name: "IWETH9",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWETH9>;
    deployContract(
      name: "IERC721Permit",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Permit>;
    deployContract(
      name: "INonfungiblePositionManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.INonfungiblePositionManager>;
    deployContract(
      name: "IPeripheryImmutableState",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPeripheryImmutableState>;
    deployContract(
      name: "IPeripheryPayments",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPeripheryPayments>;
    deployContract(
      name: "IPoolInitializer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPoolInitializer>;
    deployContract(
      name: "ISwapRouter",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISwapRouter>;
    deployContract(
      name: "BooToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BooToken>;
    deployContract(
      name: "LifeToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LifeToken>;
    deployContract(
      name: "IWETH",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWETH>;
    deployContract(
      name: "LiquidityManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LiquidityManager>;
    deployContract(
      name: "SwapMultiHop",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SwapMultiHop>;
    deployContract(
      name: "SingleSwapToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SingleSwapToken>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
