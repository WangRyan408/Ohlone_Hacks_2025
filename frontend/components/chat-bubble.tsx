"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  sender: "user" | "therapist"
  content: string
  timestamp: string
}

export function ChatBubble({ message }: { message: Message }) {
  const [formattedTime, setFormattedTime] = useState<string>("")
  const isTherapist = message.sender === "therapist"

  useEffect(() => {
    const date = new Date(message.timestamp)
    setFormattedTime(date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
  }, [message.timestamp])

  return (
    <div className={`flex ${isTherapist ? "justify-start" : "justify-end"} mb-4`}>
      {isTherapist && (
        <Avatar className="w-8 h-8 mr-2">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Therapist" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isTherapist ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        <p>{message.content}</p>
        <p className={`text-xs mt-1 ${isTherapist ? "text-secondary-foreground/70" : "text-primary-foreground/70"}`}>
          {formattedTime}
        </p>
      </div>
    </div>
  )
}

