/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "./interface/IOceanInteractions.sol";
// import "./interface/IOceanPrimitive.sol";
import "./interface/IOracle.sol";

contract Subscription is Ownable {
    struct Message {
        string role;
        string content;
    }

    struct ChatRun {
        address owner;
        Message[] messages;
        uint messagesCount;
    }

    struct Service {
        uint256 serviceId;
        string name;
        string description;
        string url;
        uint256 subscribers;
        uint256 subscriptionAmount;
        uint256 subscriptionDuration;
        bool isPublic;
    }

    struct SubscriptionDetails {
        uint256 serviceId;
        uint256 amount;
        uint256 duration;
        uint256 subscriptionPeriod;
        uint256 lastPaidTime;
        Service service;
    }

    IERC20 public token;
    address public constant ORACLE = 0x4168668812C94a3167FCd41D12014c5498D74d7e;
    // IOceanInteractions public oceanInteractions;
    // IOceanPrimitive public adapter;

    uint256 public serviceCount;
    uint private chatRunsCount;

    address[] public subscribers;
    address[] public failedTransactions;

    mapping(address => SubscriptionDetails[]) public subscriptions;
    mapping(uint256 => Service) public services;
    mapping(uint => ChatRun) public chatRuns;

    event ChatCreated(address indexed owner, uint indexed chatId);

    modifier serviceExists(uint256 _serviceId) {
        require(
            serviceCount > _serviceId,
            "serviceExists::service does not exist"
        );
        _;
    }

    // , IOceanInteractions _oceanInteractions
    // , IOceanPrimitive _oceanPrimitive
    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
        serviceCount = 0;
        // oceanInteractions = _oceanInteractions;
        // adapter = _oceanPrimitive;
    }

    function createService(
        string memory _name,
        string memory _description,
        string memory _url,
        uint256 _subscriptionAmount,
        uint256 _subscriptionDuration,
        bool _isPublic
    ) external {
        services[serviceCount] = Service(
            serviceCount,
            _name,
            _description,
            _url,
            0,
            _subscriptionAmount,
            _subscriptionDuration,
            _isPublic
        );
        serviceCount += 1;
    }

    function subscribe(
        uint256 _serviceId,
        uint256 _subscriptionPeriod
    ) external serviceExists(_serviceId) {
        token.approve(address(this), type(uint256).max);
        Service memory service = services[_serviceId];

        subscriptions[msg.sender].push(
            SubscriptionDetails(
                _serviceId,
                service.subscriptionAmount,
                service.subscriptionDuration,
                _subscriptionPeriod,
                block.timestamp,
                service
            )
        );
        subscribers.push(msg.sender);

        service.subscribers += 1;
        services[_serviceId] = service;
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

        Service memory service = services[_serviceId];
        service.subscribers -= 1;
        services[_serviceId] = service;
    }

    function startChat(string memory message) public returns (uint i) {
        ChatRun storage run = chatRuns[chatRunsCount];

        run.owner = msg.sender;
        Message memory newMessage;
        newMessage.content = message;
        newMessage.role = "user";
        run.messages.push(newMessage);
        run.messagesCount = 1;

        uint currentId = chatRunsCount;
        chatRunsCount = chatRunsCount + 1;

        IOracle(ORACLE).createLlmCall(currentId);
        emit ChatCreated(msg.sender, currentId);

        return currentId;
    }

    function onOracleLlmResponse(
        uint runId,
        string memory response,
        string memory /*errorMessage*/
    ) public {
        ChatRun storage run = chatRuns[runId];
        require(
            keccak256(
                abi.encodePacked(run.messages[run.messagesCount - 1].role)
            ) == keccak256(abi.encodePacked("user")),
            "No message to respond to"
        );

        Message memory newMessage;
        newMessage.content = response;
        newMessage.role = "assistant";
        run.messages.push(newMessage);
        run.messagesCount++;
    }

    function getMessageHistoryContents(
        uint chatId
    ) public view returns (string[] memory) {
        string[] memory messages = new string[](
            chatRuns[chatId].messages.length
        );
        for (uint i = 0; i < chatRuns[chatId].messages.length; i++) {
            messages[i] = chatRuns[chatId].messages[i].content;
        }
        return messages;
    }

    function getMessageHistoryRoles(
        uint chatId
    ) public view returns (string[] memory) {
        string[] memory roles = new string[](chatRuns[chatId].messages.length);
        for (uint i = 0; i < chatRuns[chatId].messages.length; i++) {
            roles[i] = chatRuns[chatId].messages[i].role;
        }
        return roles;
    }

    function collect(uint256 _serviceId) external onlyOwner {
        for (uint256 i = 0; i < subscribers.length; i++) {
            address subscriber = subscribers[i];
            SubscriptionDetails[] storage details = subscriptions[subscriber];
            for (uint256 j = 0; j < details.length; j++) {
                if (
                    details[j].serviceId == _serviceId &&
                    // Remove the comment for the demo
                    // details[j].lastPaidTime + details[j].duration <=
                    // block.timestamp &&
                    details[j].subscriptionPeriod > 0
                ) {
                    // swapBack(token, preferredToken, details[j].amount, unwrapFee);
                    bool success = token.transferFrom(
                        subscriber,
                        address(this),
                        details[j].amount
                    );
                    if (success) {
                        details[j].lastPaidTime = block.timestamp;
                        details[j].subscriptionPeriod -= 1;
                        // _removeFailedTransaction(subscriber);
                    } else {
                        failedTransactions.push(subscriber);
                    }
                }
            }
        }
    }

    // function swapBack(address inputAddress, address outputAddress, uint256 amount) internal {
    //     IERC20(inputAddress).approve(address(oceanInteractions), amount);

    //     Interaction[] memory interactions = new Interaction[](3);

    //     interactions[0] = Interaction({ interactionTypeAndAddress: _fetchInteractionId(inputAddress, uint256(InteractionType.WrapErc20)), inputToken: 0, outputToken: 0, specifiedAmount: amount, metadata: bytes32(0) });

    //     interactions[1] = Interaction({
    //         interactionTypeAndAddress: _fetchInteractionId(address(adapter), uint256(InteractionType.ComputeOutputAmount)),
    //         inputToken: _calculateOceanId(inputAddress),
    //         outputToken: _calculateOceanId(outputAddress),
    //         specifiedAmount: type(uint256).max,
    //         metadata: bytes32(0)
    //     });

    //     interactions[2] = Interaction({ interactionTypeAndAddress: _fetchInteractionId(outputAddress, uint256(InteractionType.UnwrapErc20)), inputToken: 0, outputToken: 0, specifiedAmount: type(uint256).max, metadata: bytes32(0) });

    //     // erc1155 token id's for balance delta
    //     uint256[] memory ids = new uint256[](2);
    //     ids[0] = _calculateOceanId(inputAddress);
    //     ids[1] = _calculateOceanId(outputAddress);

    //     oceanInteractions.doMultipleInteractions(interactions, ids);
    // }

    //  function _calculateOceanId(address tokenAddress) internal pure returns (uint256) {
    //     return uint256(keccak256(abi.encodePacked(tokenAddress, uint256(0))));
    // }

    // function _fetchInteractionId(address token, uint256 interactionType) internal pure returns (bytes32) {
    //     uint256 packedValue = uint256(uint160(token));
    //     packedValue |= interactionType << 248;
    //     return bytes32(abi.encode(packedValue));
    // }

    function getAllServices() external view returns (Service[] memory) {
        Service[] memory _services = new Service[](serviceCount);
        for (uint256 i = 0; i < serviceCount; i++) {
            _services[i] = services[i];
        }
        return _services;
    }

    function getSubscriptions(
        address _subscriber
    ) external view returns (SubscriptionDetails[] memory) {
        return subscriptions[_subscriber];
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
