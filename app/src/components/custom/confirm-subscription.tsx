import { FC, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import ServiceCard from "./service-card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { SelectLabel } from "@radix-ui/react-select"
import { Input } from "../ui/input"
import { getContract } from "@/utils/provider"
import { toast } from "sonner"
import { CheckIcon } from "@radix-ui/react-icons"
import { truncateAddress } from "@/utils/format"

interface Props {
  isOpen?: boolean
  service: Service
  children?: React.ReactNode
}

const ConfirmSubscription: FC<Props> = ({ isOpen, service, children }) => {
  const [subscriptionToken, setSubscriptionToken] = useState("")
  const [durationAmount, setDurationAmount] = useState<number>()
  const [durationPeriod, setDurationPeriod] = useState("")
  const [tx, setTx] = useState("")

  const canSubscribe = subscriptionToken && durationAmount && durationPeriod

  const subscribe = async () => {
    if (!canSubscribe) return undefined

    const contract = await getContract()

    await contract
      .subscribe(service.serviceId, durationAmount * Number(durationPeriod))
      .then((tx) => {
        setTx(tx.hash)
        toast.success(`You have just subscribed to ${service.name}`)
      })
      .catch((e) => toast.error(e))
  }

  return (
    <Dialog open={isOpen ? true : undefined}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {!tx ? (
        <DialogContent className="w-96 rounded-md text-sm font-bold">
          <DialogHeader>
            <DialogTitle className="text-start">
              Confirm Subscription
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col gap-4">
            <ServiceCard service={service} clickable={false} />
            <Select
              value={subscriptionToken}
              onValueChange={(e) => setSubscriptionToken(e)}
            >
              <SelectGroup>
                <SelectLabel>Subscription token</SelectLabel>

                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subscription token..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="arb">ARB</SelectItem>
                  <SelectItem value="arb">WBTC</SelectItem>
                </SelectContent>
              </SelectGroup>
            </Select>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Input amount..."
                type="number"
                value={durationAmount}
                onChange={(e) => setDurationAmount(e.target.valueAsNumber)}
              />
              <Select
                value={durationPeriod}
                onValueChange={(e) => setDurationPeriod(e)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="86400">Days</SelectItem>
                  <SelectItem value="2629746">Months</SelectItem>
                  <SelectItem value="31556952">Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disabled={!canSubscribe} onClick={subscribe}>
              Subscribe
            </Button>
          </DialogDescription>
        </DialogContent>
      ) : (
        <DialogContent className="w-96 rounded-md text-sm font-bold">
          <DialogHeader>
            <DialogTitle className="text-start">
              Subscription Successful
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col gap-4 border border-secondary rounded-md p-8">
            <div className="flex items-center gap-2">
              <CheckIcon />
              <p>
                View your transaction:{" "}
                <a className="underline" href={`https://sepolia.etherscan.io/tx/${tx}`}>
                  {truncateAddress(tx)}
                </a>
              </p>
            </div>

          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  )
}

export default ConfirmSubscription
