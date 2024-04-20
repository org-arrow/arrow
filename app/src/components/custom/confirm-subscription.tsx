import { FC, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  service: Service
}

const ConfirmSubscription: FC<Props> = ({ isOpen, onOpenChange, service }) => {
  const [subscriptionToken, setSubscriptionToken] = useState("")
  const [durationAmount, setDurationAmount] = useState<number>()
  const [durationPeriod, setDurationPeriod] = useState("")

  const canSubscribe = subscriptionToken && durationAmount && durationPeriod

  const subscribe = async () => {}

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-96 rounded-md text-sm font-bold">
        <DialogHeader>
          <DialogTitle className="text-start">Confirm Subscription</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-4">
          <ServiceCard service={service} clickable={false} />
          <Select value={subscriptionToken} onValueChange={(e) => setSubscriptionToken(e)}>
            <SelectGroup>
              <SelectLabel>Subscription token</SelectLabel>

              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select subscription token..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">USDC</SelectItem>
                <SelectItem value="dark">BTC</SelectItem>
                <SelectItem value="system">ETH</SelectItem>
                <SelectItem value="system">ARB</SelectItem>
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
            <Select value={durationPeriod} onValueChange={(e) => setDurationPeriod(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select duration..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Days</SelectItem>
                <SelectItem value="dark">Months</SelectItem>
                <SelectItem value="system">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button disabled={!canSubscribe} onClick={subscribe}>
            Subscribe
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmSubscription
