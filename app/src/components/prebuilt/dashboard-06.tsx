// PRE-BUILT COMPONENT - https://ui.shadcn.com/blocks#dashboard-06

"use client"

import { FC } from "react"
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

const Dashboard06: FC = () => {
  const { data: allServices }: { data: Service[] | undefined } = useView(
    "getAllServices",
    []
  )

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
          <Button className="flex gap-2" size="sm">
            <PlusIcon />
            Create Service
          </Button>
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
                <TableRow className="cursor-pointer" key={service.serviceId} onClick={() => console.log('clicked')}>
                  <TableCell className="hidden sm:table-cell">
                    <Avatar>
                      <AvatarImage width={14} height={14} src={service.url} />
                      <AvatarFallback>{service.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.isPublic ? 'Public' : 'Unlisted'}</Badge>
                  </TableCell>
                  <TableCell>${formatEther(service.subscriptionAmount.toString())}</TableCell>
                  <TableCell className="hidden md:table-cell">{service.subscribers.toString()}</TableCell>
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
