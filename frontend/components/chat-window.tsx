"use client"

import { useState, useEffect, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChatBubble } from "./chat-bubble"

interface Message {
  id: number
  sender: "user" | "therapist"
  content: string
  timestamp: string // Change this to string
}

const initialMessages: Record<number, Message[]> = {
  1: [
    { id: 1, sender: "therapist", content: "Hello! How can I help you today?", timestamp: "2023-05-01T10:00:00Z" },
    { id: 2, sender: "user", content: "I've been feeling anxious lately.", timestamp: "2023-05-01T10:05:00Z" },
  ],
  2: [{ id: 1, sender: "therapist", content: "Hi there! How's your day going?", timestamp: "2023-05-01T11:00:00Z" }],
}

export function ChatWindow({ conversationId }: { conversationId: number | null }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (conversationId) {
      setMessages(initialMessages[conversationId] || [])
    }
  }, [conversationId])

  const handleSendMessage = () => {
    if (newMessage.trim() && conversationId) {
      const message: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage.trim(),
        timestamp: new Date().toISOString(), // Use ISO string for new messages
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {conversationId ? (
          messages.map((message) => <ChatBubble key={message.id} message={message} />)
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a conversation to start chatting.</p>
          </div>
        )}
      </div>
      <div className="p-4 bg-background border-t">
        <div className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={conversationId ? "Type your message..." : "Select a conversation to start chatting"}
            className="flex-1"
            disabled={!conversationId}
          />
          <Button onClick={handleSendMessage} disabled={!conversationId}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

