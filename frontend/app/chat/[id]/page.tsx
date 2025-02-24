"use client"

import { useState } from "react"
import { ClientOnly } from "@/components/client-only"
import { ConversationList } from "@/components/conversation-list"
import { ChatWindow } from "@/components/chat-window"

export default function ChatPage({ params }: { params: { id: string } }) {
  const [activeConversation, setActiveConversation] = useState(Number.parseInt(params.id))

  return (
    <ClientOnly>
      <div className="flex h-screen">
        <ConversationList activeConversation={activeConversation} setActiveConversation={setActiveConversation} />
        <ChatWindow conversationId={activeConversation} />
      </div>
    </ClientOnly>
  )
}

