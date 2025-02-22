"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ClientOnly } from "./client-only"

export function MessageForm({ therapistId }: { therapistId: number }) {
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the message to your backend
    console.log(`Sending message to therapist ${therapistId}: ${message}`)
    toast({
      title: "Message Sent",
      description: "Your message has been sent securely to the therapist.",
    })
    setMessage("")
  }

  return (
    <ClientOnly>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit">Send Secure Message</Button>
      </form>
    </ClientOnly>
  )
}

