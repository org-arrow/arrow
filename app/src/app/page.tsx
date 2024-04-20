"use client"

import ConfirmSubscription from "@/components/custom/confirm-subscription"
import Header from "@/components/custom/header"
import LLMInput from "@/components/custom/llm-input"
import ScanDropdown from "@/components/custom/scan-dropdown"
import ServiceCard from "@/components/custom/service-card"
import Wrapper from "@/components/custom/wrapper"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import useConnectWallet from "@/hooks/useConnectWallet"
import useView from "@/hooks/useView"
import { getContract } from "@/utils/provider"
import { DialogTitle } from "@radix-ui/react-dialog"
import { FC, useEffect, useState } from "react"

const Root: FC = () => {
  const [qrcodeResult, setQrcodeResult] = useState("")
  const { address, connect } = useConnectWallet()

  const { data: allServices } = useView("getAllServices", [])

  useEffect(() => {
    ;(async () => {
      const contract = await getContract()
    })()
  }, [qrcodeResult])

  return (
    <>
      {allServices && <ConfirmSubscription
        isOpen={!qrcodeResult}
        onOpenChange={() => setQrcodeResult("")}
        service={allServices?.[0]}
      />}
      <Wrapper className="p-8 max-w-md mx-auto">
        <Header address={address} connect={connect} />
        {address ? (
          <Wrapper>
            <LLMInput />
            {Object.keys(allServices || {}).length === 0 ? (
              <div className="flex items-center justify-center p-10 border rounded-md text-sm text-gray-600 font-bold">
                There are currently no services available
              </div>
            ) : (
              allServices?.map((service: Service) => (
                <ServiceCard key={service.serviceId} service={service} />
              ))
            )}
          </Wrapper>
        ) : (
          <div className="flex items-center justify-center p-10 border rounded-md text-sm text-gray-600 font-bold">
            Connect your wallet
          </div>
        )}
        {address && <ScanDropdown setQrcodeResult={setQrcodeResult} />}
      </Wrapper>
    </>
  )
}

export default Root
