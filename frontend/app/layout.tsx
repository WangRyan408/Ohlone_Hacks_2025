import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ClientOnly } from "@/components/client-only"

const inter = Inter({ subsets: ["latin"] })

const DynamicToaster = dynamic(() => import("@/components/ui/toaster").then((mod) => mod.Toaster), {
  ssr: false,
})

export const metadata = {
  title: "Therapist-Patient Connection",
  description: "Connect with therapists and access mental health resources",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <header className="bg-primary text-primary-foreground">
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:underline">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/chat/1" className="hover:underline">
                    Chat
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main>{children}</main>
          <DynamicToaster />
        </ClientOnly>
      </body>
    </html>
  )
}

