"use client"

import { useState, useEffect, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChatBubble } from "./chat-bubble"
import { useChannel, ChannelProvider } from "ably/react"
import type { Message as AblyMessage } from "ably"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  sender: "user" | "therapist"
  content: string
  timestamp: string
}

function getChannelName(therapistId: number, userId: string) {
  return `chat:${therapistId}:${userId}`;
}

function ChatMessages({ channelName }: { channelName: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { user } = useAuth()
  
  const { channel } = useChannel(channelName);

  useEffect(() => {
    if (!channel) return;

    console.log('Channel ready:', channel.name);
    
    const handleMessage = (msg: AblyMessage) => {
      console.log('Message received:', msg);
      const message = msg.data as Message;
      setMessages(prev => {
        console.log('Previous messages:', prev);
        const newMessages = [...prev, message];
        console.log('New messages:', newMessages);
        return newMessages;
      });
    };

    channel.subscribe('message', handleMessage);

    return () => {
      channel.unsubscribe('message', handleMessage);
    };
  }, [channel]);

  // Debug messages state changes
  useEffect(() => {
    console.log('Messages state updated:', messages);
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && channel && user) {
      const message: Message = {
        id: crypto.randomUUID(),
        sender: "user",
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      
      try {
        console.log('Sending message:', message);
        await channel.publish('message', message);
        console.log('Message sent successfully');
        
        // Add message to state immediately
        setMessages(prev => [...prev, message]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground">No messages yet</div>
          ) : (
            messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))
          )}
        </div>
      </div>
      <div className="p-4 bg-background border-t">
        <div className="flex space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={!user}
          />
          <Button onClick={() => handleSendMessage()} disabled={!user}>
            Send
          </Button>
        </div>
      </div>
    </>
  )
}

export function ChatWindow({ conversationId }: { conversationId: number | null }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/sign-in')
    }
  }, [loading, user, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  const channelName = conversationId ? getChannelName(conversationId, user.id) : "none";

  return (
    <div className="flex-1 flex flex-col">
      {conversationId ? (
        <ChannelProvider channelName={channelName}>
          <ChatMessages channelName={channelName} />
        </ChannelProvider>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Select a conversation to start chatting.</p>
        </div>
      )}
    </div>
  )
}

