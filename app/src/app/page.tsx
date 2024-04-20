"use client"

import ConfirmSubscription from "@/components/custom/confirm-subscription"
import Header from "@/components/custom/header"
import LLMInput from "@/components/custom/llm-input"
import Notice from "@/components/custom/notice"
import ScanDropdown from "@/components/custom/scan-dropdown"
import ServiceCard from "@/components/custom/service-card"
import Wrapper from "@/components/custom/wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useConnectWallet from "@/hooks/useConnectWallet"
import useView from "@/hooks/useView"
import { FC, useEffect, useState } from "react"

const Root: FC = () => {
  const [qrcodeResult, setQrcodeResult] = useState("")
  const { address, connect } = useConnectWallet()

  const { data: allServices }: { data: Service[] | undefined } = useView(
    "getAllServices",
    []
  )

  useEffect(() => {
    if (qrcodeResult) {
      setTimeout(() => {
        // Code to be executed after 20 second
        setQrcodeResult("")
      }, 20000)
    }
  }, [qrcodeResult])

  return (
    <>
      {allServices && (
        <ConfirmSubscription
          isOpen={!!qrcodeResult}
          service={allServices?.[0]}
        />
      )}
      <Wrapper className="p-8 max-w-md mx-auto">
        <Header address={address} connect={connect} />
        {address ? (
          <Wrapper>
            <LLMInput />
            <Tabs defaultValue="services" className="w-full">
              <TabsList>
                <TabsTrigger value="services">All Services</TabsTrigger>
                <TabsTrigger value="subscriptions">
                  My Subscriptions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="services">
                {Object.keys(allServices || {}).length === 0 ? (
                  <Notice text="There are currently no services available" />
                ) : (
                  <div className="flex flex-col gap-2">
                    {allServices?.map((service: Service) => (
                      <ServiceCard key={service.serviceId} service={service} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="subscriptions">
                Change your password here.
              </TabsContent>
            </Tabs>
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
