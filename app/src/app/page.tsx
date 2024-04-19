"use client"

import Header from "@/components/custom/header"
import ScanDropdown from "@/components/custom/scan-dropdown"
import Wrapper from "@/components/custom/wrapper"
import useConnectWallet from "@/hooks/useConnectWallet"
import { FC, useState } from "react"

const Root: FC = () => {
  const [qrcodeResult, setQrcodeResult] = useState("")

  const { address, connect } = useConnectWallet()
  return (
    <Wrapper className="p-8 max-w-md mx-auto">
      <Header address={address} connect={connect} />
      <Wrapper>TODO</Wrapper>
      {address && <ScanDropdown setQrcodeResult={setQrcodeResult} />}
    </Wrapper>
  )
}

export default Root
