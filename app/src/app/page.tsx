"use client"

import Header from "@/components/custom/header"
import LLMInput from "@/components/custom/llm-input"
import ScanDropdown from "@/components/custom/scan-dropdown"
import Wrapper from "@/components/custom/wrapper"
import useConnectWallet from "@/hooks/useConnectWallet"
import useView from "@/hooks/useView"
import { FC, useState } from "react"

const Root: FC = () => {
  const [qrcodeResult, setQrcodeResult] = useState("")
  const { address, connect } = useConnectWallet()

  const { data: allServices } = useView("getAllServices", [])

  console.log(allServices)

  return (
    <Wrapper className="p-8 max-w-md mx-auto">
      <Header address={address} connect={connect} />
      {address ? (
        <Wrapper>
          <LLMInput />
        </Wrapper>
      ) : (
        <div className="flex items-center justify-center p-10 border rounded-md text-sm text-gray-600 font-bold">
          Connect your wallet
        </div>
      )}
      {address && <ScanDropdown setQrcodeResult={setQrcodeResult} />}
    </Wrapper>
  )
}

export default Root
