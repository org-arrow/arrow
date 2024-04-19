// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Subscription is Ownable {
    struct SubscriptionDetails {
        uint256 amount;
        uint256 duration;
        uint256 lastPaidTime;
    }

    IERC20 public token;

    address[] public subscribers;
    address[] public failedTransactions;

    mapping(address => SubscriptionDetails) public subscriptions;

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    function subscribe(uint256 _amount, uint256 _duration) external {
        require(_amount > 0, "subscribe::amount must be greater than 0");
        require(_duration > 0, "subscribe::duration must be greater than 0");

        token.approve(address(this), type(uint256).max);

        subscriptions[msg.sender] = SubscriptionDetails(
            _amount,
            _duration,
            block.timestamp
        );
        subscribers.push(msg.sender);
    }

    function unsubscribe() external {
        delete subscriptions[msg.sender];
        for (uint256 i = 0; i < subscribers.length; i++) {
            if (subscribers[i] == msg.sender) {
                subscribers[i] = subscribers[subscribers.length - 1];
                subscribers.pop();
                break;
            }
        }
    }

    function collect() external onlyOwner {
        for (uint256 i = 0; i < subscribers.length; i++) {
            address subscriber = subscribers[i];
            SubscriptionDetails memory details = subscriptions[subscriber];
            if (details.lastPaidTime + details.duration <= block.timestamp) {
                bool success = token.transferFrom(
                    subscriber,
                    msg.sender,
                    details.amount
                );
                if (success) {
                    details.lastPaidTime = block.timestamp;
                    subscriptions[subscriber] = details;
                    removeFailedTransaction(subscriber);
                } else {
                    failedTransactions.push(subscriber);
                }
            }
        }
    }

    function removeFailedTransaction(address subscriber) internal {
        for (uint256 i = 0; i < failedTransactions.length; i++) {
            if (failedTransactions[i] == subscriber) {
                failedTransactions[i] = failedTransactions[
                    failedTransactions.length - 1
                ];
                failedTransactions.pop();
                break;
            }
        }
    }
}
