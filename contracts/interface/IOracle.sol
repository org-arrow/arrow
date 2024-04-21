// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IOracle {
    function createLlmCall(
        uint promptId
    ) external returns (uint);
}