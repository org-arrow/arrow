import { task } from 'hardhat/config'
import { save } from './utils/save'
import { verify } from './utils/verify'
import { defineChain } from 'viem';

const galadriel = defineChain({
  id: 696969,
  name: 'Galadriel',
  nativeCurrency: { name: 'Galadriel', symbol: 'GAL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://devnet.galadriel.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Galadriel Explorer',
      url: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api',
    },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xce01f8eee7E479C928F8919abD53E553a36CeF67',
      blockCreated: 19_258_213,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14_353_601,
    },
  },
})

task('deploy', '📰 Deploys a contract, saves the artifact and verifies it.')
.addParam('contract', 'Name of the contract to deploy.', 'Subscription')
.addFlag('save', 'Flag to indicate whether to save the contract or not')
.addFlag('verify', 'Flag to indicate whether to verify the contract or not')
.setAction(async (args, { viem, run, network }) => {
  // const Token = await viem.deployContract('Token')
  
  // const  = await viem.getPublicClient({
  //   chain: mainnet,
    
  // });client
    // console.log(
    //   `📦 Token deployed to ${Token.address} successfully!`
    // )

    const tokenAddress = '0xc7d402a7c322b9f0774a8facd39b64d3aaaf67c5'

    const Contract = await viem.deployContract(args.contract, [tokenAddress])
    console.log(
      `📰 Contract ${Contract.address} deployed to ${network.name} successfully!`
    )

    const chainId = (await viem.getPublicClient()).chain.id

    args.save && (await save(chainId, Contract.address, Contract.abi))
    args.verify && (await verify(run, Contract.address, []))
  })
