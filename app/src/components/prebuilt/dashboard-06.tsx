// PRE-BUILT COMPONENT - https://ui.shadcn.com/blocks#dashboard-06

"use client"

import { FC, useState } from "react"
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Wrapper from "./common/wrapper"
import { PlusIcon } from "@radix-ui/react-icons"
import useView from "@/hooks/useView"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { formatEther, parseEther } from "ethers"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { getContract } from "@/utils/provider"
import { toast } from "sonner"

const Dashboard06: FC = () => {
  const [serviceName, setServiceName] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [serviceUrl, setServiceUrl] = useState("")
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>()
  const [subscriptionDuration, setSubscriptionDuration] = useState<number>()
  const [isPublic, setIsPublic] = useState<boolean>(false)

  const { data: allServices }: { data: Service[] | undefined } = useView(
    "getAllServices",
    []
  )

  const createService = async () => {
    const contract = await getContract()

    await contract
      .createService(
        serviceName,
        serviceDescription,
        serviceUrl,
        parseEther(subscriptionAmount?.toString() || "0"),
        subscriptionDuration || 0 * 86400,
        isPublic
      )
      .then(() => {
        toast.success("Service created successfully")
      })
      .catch((error) => {
        toast.error(`Service creation failed: ${error}`)
      })
  }

  return (
    <Wrapper>
      <Card className="m-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Services</CardTitle>
            <CardDescription>
              Manage your services and view their performance.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button className="flex gap-2" size="sm">
                <PlusIcon />
                Create Service
              </Button>
            </DialogTrigger>
            <DialogContent className="w-96 rounded-md text-sm font-bold">
              <DialogHeader>
                <DialogTitle className="text-start">
                  Create a new service
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 border rounded-md border-secondary p-4">
                <div>
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    placeholder="Enter service name..."
                    className="w-full"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="serviceDescription">
                    Service Description
                  </Label>
                  <Input
                    id="serviceDescription"
                    placeholder="Enter service description..."
                    className="w-full"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="serviceUrl">Service URL</Label>
                  <Input
                    id="serviceUrl"
                    placeholder="Enter service URL..."
                    className="w-full"
                    value={serviceUrl}
                    onChange={(e) => setServiceUrl(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="subscriptionAmount">
                    Subscription Amount
                  </Label>
                  <Input
                    id="subscriptionAmount"
                    placeholder="Enter subscription amount..."
                    className="w-full"
                    type="number"
                    value={subscriptionAmount}
                    onChange={(e) =>
                      setSubscriptionAmount(Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="subscriptionDuration">
                    Subscription Duration
                  </Label>
                  <Input
                    id="subscriptionDuration"
                    placeholder="Enter subscription duration..."
                    className="w-full"
                    type="number"
                    value={subscriptionDuration}
                    onChange={(e) =>
                      setSubscriptionDuration(Number(e.target.value))
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={isPublic}
                    onCheckedChange={(e) => setIsPublic(Boolean(e.valueOf()))}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Make this service public
                  </label>
                </div>
              </div>
              <Button onClick={createService}>Create Service</Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Subscribers
                </TableHead>
                <TableHead className="hidden md:table-cell">Period</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allServices?.map((service: Service) => (
                <TableRow
                  className="cursor-pointer"
                  key={service.serviceId}
                  onClick={() => console.log("clicked")}
                >
                  <TableCell className="hidden sm:table-cell">
                    <Avatar>
                      <AvatarImage width={14} height={14} src={service.url} />
                      <AvatarFallback>{service.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {service.isPublic ? "Public" : "Unlisted"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ${formatEther(service.subscriptionAmount.toString())}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {service.subscribers.toString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {service.subscriptionDuration.toString()} days
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export default Dashboard06
