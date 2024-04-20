import { CHAIN_ID } from "@/constants"
import { Contracts } from "@/constants/deployedContracts"
import { ethers } from "ethers"
import { env } from "@/env.mjs"
import { MAINNET_CONTRACT_ABI, MAINNET_CONTRACT_ADDRESS, MAINNET_RPC_URL } from "@/constants/talkOnlineContract"

export const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  return new ethers.Contract(
    Contracts[CHAIN_ID].address,
    Contracts[CHAIN_ID].abi,
    signer
  )
}

export const getGaslessContract = async () => {
  const provider = new ethers.JsonRpcProvider(MAINNET_RPC_URL)
  const signer = new ethers.Wallet(env.NEXT_PUBLIC_GASLESS_SIGNER, provider)

  return new ethers.Contract(
    MAINNET_CONTRACT_ADDRESS,
    MAINNET_CONTRACT_ABI,
    signer
  )
}
