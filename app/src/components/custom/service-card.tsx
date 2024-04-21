import { FC, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { formatEther } from "ethers"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"
import ConfirmSubscription from "./confirm-subscription"

interface Props {
  service: Service
  clickable?: boolean
}

const ServiceCard: FC<Props> = ({ service, clickable = true }) => {
  return (
    <ConfirmSubscription service={service}>
      <Card
        className={cn("", {
          [`cursor-pointer hover:border-primary transition-all duration-300`]:
            clickable,
        })}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                width={14}
                height={14}
                src={`https://logo.clearbit.com/${service.url}`}
              />
              <AvatarFallback>{service.name}</AvatarFallback>
            </Avatar>

            <CardTitle>{service.name}</CardTitle>
          </div>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Badge>{service.subscribers.toString()} subscribers</Badge>
          <Badge>{service.subscriptionDuration.toString()} days</Badge>
          <Badge>${formatEther(service.subscriptionAmount)}</Badge>
        </CardContent>
      </Card>
    </ConfirmSubscription>
  )
}

export default ServiceCard
