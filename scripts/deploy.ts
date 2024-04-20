import { task } from 'hardhat/config'
import { save } from './utils/save'
import { verify } from './utils/verify'

task('deploy', '📰 Deploys a contract, saves the artifact and verifies it.')
  .addParam('contract', 'Name of the contract to deploy.', 'Subscription')
  .addFlag('save', 'Flag to indicate whether to save the contract or not')
  .addFlag('verify', 'Flag to indicate whether to verify the contract or not')
  .setAction(async (args, { viem, run, network }) => {
    // const Token = await viem.deployContract('Token')

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
