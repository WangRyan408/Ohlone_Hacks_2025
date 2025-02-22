"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ConversationList } from "@/components/conversation-list"
import { ChatWindow } from "@/components/chat-window"

export function ClientChatPage() {
  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const therapistId = searchParams.get("therapistId")
    if (therapistId) {
      setActiveConversation(Number.parseInt(therapistId))
    }
  }, [searchParams])

  const handleSetActiveConversation = (id: number) => {
    setActiveConversation(id)
  }

  return (
    <div className="flex h-screen">
      <ConversationList activeConversation={activeConversation} setActiveConversation={handleSetActiveConversation} />
      <ChatWindow conversationId={activeConversation} />
    </div>
  )
}

