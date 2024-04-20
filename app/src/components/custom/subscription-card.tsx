import { FC } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getContract } from "@/utils/provider"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { formatEpochToDate } from "@/utils/format"
import { formatEther } from "ethers"

interface Props {
  subscription: Subscription
}

const SubscriptionCard: FC<Props> = ({ subscription }) => {
  const unsubscribe = async () => {
    const contract = await getContract()

    await contract
      .unsubscribe(subscription.serviceId)
      .then(() => {
        toast.success(
          `You have just unsubscribed from ${subscription.service.name}`
        )
      })
      .catch((e) => toast.error(e))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                width={14}
                height={14}
                src={subscription.service.url}
              />
              <AvatarFallback>{subscription.service.name}</AvatarFallback>
            </Avatar>

            <CardTitle>{subscription.service.name}</CardTitle>
          </div>
          <Badge className="bg-green-500">Active Subscription</Badge>
        </div>
        <CardDescription>{subscription.service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge>
            {formatEpochToDate(Number(subscription.subscriptionPeriod))}{" "}
            remaining
          </Badge>
          <Badge>{subscription.duration.toString()} days</Badge>
          <Badge>${formatEther(subscription.service.subscriptionAmount)}</Badge>
        </div>
        <Button className="w-full" onClick={unsubscribe}>
          Unsubscribe
        </Button>
      </CardContent>
    </Card>
  )
}

export default SubscriptionCard
