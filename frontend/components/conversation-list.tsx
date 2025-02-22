"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Conversation {
  id: number
  therapistId: number
  name: string
  image: string
  lastMessage: string
}

// This would typically come from an API or database
const initialConversations: Conversation[] = [
  {
    id: 1,
    therapistId: 1,
    name: "Dr. Emily Johnson",
    image: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hello! How can I help you today?",
  },
  {
    id: 2,
    therapistId: 3,
    name: "Dr. Sarah Williams",
    image: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hi there! How's your day going?",
  },
]

const therapists = [
  { id: 1, name: "Dr. Emily Johnson", image: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Dr. Michael Chen", image: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Dr. Sarah Williams", image: "/placeholder.svg?height=40&width=40" },
]

interface ConversationListProps {
  activeConversation: number | null
  setActiveConversation: (id: number) => void
}

export function ConversationList({ activeConversation, setActiveConversation }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)

  useEffect(() => {
    if (activeConversation !== null) {
      const existingConversation = conversations.find((c) => c.therapistId === activeConversation)
      if (!existingConversation) {
        const newTherapist = therapists.find((t) => t.id === activeConversation)
        if (newTherapist) {
          const newConversation: Conversation = {
            id: conversations.length + 1,
            therapistId: newTherapist.id,
            name: newTherapist.name,
            image: newTherapist.image,
            lastMessage: "Start a new conversation",
          }
          setConversations((prevConversations) => [...prevConversations, newConversation])
        }
      }
    }
  }, [activeConversation, conversations])

  return (
    <div className="w-1/4 bg-secondary p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Conversations</h2>
      {conversations.length > 0 ? (
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`flex items-center p-2 cursor-pointer rounded ${
                activeConversation === conversation.therapistId
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary-foreground/10"
              }`}
              onClick={() => setActiveConversation(conversation.therapistId)}
            >
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage src={conversation.image} alt={conversation.name} />
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold truncate">{conversation.name}</p>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No conversations yet.</p>
      )}
    </div>
  )
}

