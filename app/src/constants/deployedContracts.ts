import { InterfaceAbi } from "ethers";

interface Artifact {
  [key: string]: {
    address: `0x${string}`;
    abi: InterfaceAbi;
  };
}

export const Contracts: Artifact = {
  11155111: {
    address: "0x5fd2aef63414a610f996abf0e540583e4142b922",
    abi: [
      {
        inputs: [
          {
            internalType: "contract IERC20",
            name: "_token",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_serviceId",
            type: "uint256",
          },
        ],
        name: "collect",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "string",
            name: "_url",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_subscriptionAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_subscriptionDuration",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "_isPublic",
            type: "bool",
          },
        ],
        name: "createService",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "failedTransactions",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllServices",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "serviceId",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "subscribers",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "subscriptionAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "subscriptionDuration",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "isPublic",
                type: "bool",
              },
            ],
            internalType: "struct Subscription.Service[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_subscriber",
            type: "address",
          },
        ],
        name: "getSubscriptions",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "serviceId",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "subscriptionPeriod",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lastPaidTime",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "serviceId",
                    type: "uint256",
                  },
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "description",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "url",
                    type: "string",
                  },
                  {
                    internalType: "uint256",
                    name: "subscribers",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "subscriptionAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "subscriptionDuration",
                    type: "uint256",
                  },
                  {
                    internalType: "bool",
                    name: "isPublic",
                    type: "bool",
                  },
                ],
                internalType: "struct Subscription.Service",
                name: "service",
                type: "tuple",
              },
            ],
            internalType: "struct Subscription.SubscriptionDetails[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "serviceCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "services",
        outputs: [
          {
            internalType: "uint256",
            name: "serviceId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "url",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "subscribers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "subscriptionAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "subscriptionDuration",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_serviceId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_subscriptionPeriod",
            type: "uint256",
          },
        ],
        name: "subscribe",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "subscribers",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "subscriptions",
        outputs: [
          {
            internalType: "uint256",
            name: "serviceId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "subscriptionPeriod",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPaidTime",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "serviceId",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "subscribers",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "subscriptionAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "subscriptionDuration",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "isPublic",
                type: "bool",
              },
            ],
            internalType: "struct Subscription.Service",
            name: "service",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "token",
        outputs: [
          {
            internalType: "contract IERC20",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_serviceId",
            type: "uint256",
          },
        ],
        name: "unsubscribe",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};
