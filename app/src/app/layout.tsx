import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import Providers from "./providers"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arrow",
  description: "Native web3 recurring subscription platform built with AI.",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="manifest" href="/manifest.json" />
      <body
        className={cn(
          "min-h-screen bg-background antialiased h-1",
          inter.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
