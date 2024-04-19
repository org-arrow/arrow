/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Subscription is Ownable {
    struct SubscriptionDetails {
        uint256 serviceId;
        uint256 amount;
        uint256 duration;
        uint256 lastPaidTime;
    }

    IERC20 public token;

    address[] public subscribers;
    address[] public failedTransactions;

    mapping(address => SubscriptionDetails[]) public subscriptions;

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    function subscribe(
        uint256 _serviceId,
        uint256 _amount,
        uint256 _duration
    ) external {
        require(_amount > 0, "subscribe::amount must be greater than 0");
        require(_duration > 0, "subscribe::duration must be greater than 0");

        token.approve(address(this), type(uint256).max);

        subscriptions[msg.sender].push(
            SubscriptionDetails(_serviceId, _amount, _duration, block.timestamp)
        );
        subscribers.push(msg.sender);
    }

    function unsubscribe(uint256 _serviceId) external {
        SubscriptionDetails[] storage userSubscriptions = subscriptions[
            msg.sender
        ];
        for (uint256 i = 0; i < userSubscriptions.length; i++) {
            if (userSubscriptions[i].serviceId == _serviceId) {
                userSubscriptions[i] = userSubscriptions[
                    userSubscriptions.length - 1
                ];
                userSubscriptions.pop();
                break;
            }
        }
    }

    function collect(uint256 _serviceId) external onlyOwner {
        for (uint256 i = 0; i < subscribers.length; i++) {
            address subscriber = subscribers[i];
            SubscriptionDetails[] storage details = subscriptions[subscriber];
            for (uint256 j = 0; j < details.length; j++) {
                if (
                    details[j].serviceId == _serviceId &&
                    details[j].lastPaidTime + details[j].duration <=
                    block.timestamp
                ) {
                    bool success = token.transferFrom(
                        subscriber,
                        msg.sender,
                        details[j].amount
                    );
                    if (success) {
                        details[j].lastPaidTime = block.timestamp;
                        _removeFailedTransaction(subscriber);
                    } else {
                        failedTransactions.push(subscriber);
                    }
                }
            }
        }
    }

    function _removeFailedTransaction(address subscriber) internal {
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
