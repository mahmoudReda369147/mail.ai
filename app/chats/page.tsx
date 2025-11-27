"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Sparkles, User, Bot, Plus, ArrowLeft } from "lucide-react"

const conversations = [
  {
    id: "1",
    name: "Email Reply Assistant",
    lastMessage: "How can I help you with your email?",
    time: "Just now",
    unread: true,
  },
  {
    id: "2",
    name: "Template Generator",
    lastMessage: "Here's a template for your request...",
    time: "2h ago",
    unread: false,
  },
  { id: "3", name: "Writing Coach", lastMessage: "Great improvement on the tone!", time: "Yesterday", unread: false },
]

const messages = [
  {
    id: "1",
    role: "bot",
    content: "Hello! I'm your ReplyGenie AI assistant. How can I help you craft the perfect email today?",
  },
  {
    id: "2",
    role: "user",
    content: "I need help writing a professional response to a client who is upset about a delayed project.",
  },
  {
    id: "3",
    role: "bot",
    content:
      "I understand. Here's a suggested response that acknowledges their concerns while maintaining professionalism:\n\n\"Dear [Client Name],\n\nThank you for reaching out, and I sincerely apologize for the delay in our project timeline. I understand how frustrating this must be, and I take full responsibility for the inconvenience caused.\n\nWe have identified the issues that caused the delay and have implemented measures to ensure we get back on track. I'd like to schedule a call this week to discuss our updated timeline and address any concerns you may have.\n\nYour satisfaction is our priority, and we are committed to delivering exceptional results.\n\nBest regards,\n[Your Name]\"",
  },
  { id: "4", role: "user", content: "Can you make it a bit shorter and more direct?" },
  {
    id: "5",
    role: "bot",
    content:
      "Of course! Here's a more concise version:\n\n\"Dear [Client Name],\n\nI apologize for the project delay. We've resolved the issues and are back on track. I'd like to schedule a brief call to discuss our updated timeline.\n\nPlease let me know your availability this week.\n\nBest regards,\n[Your Name]\"",
  },
]

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [inputMessage, setInputMessage] = useState("")
  const [showChatList, setShowChatList] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="flex h-[calc(100vh-64px)]">
          {/* Conversations List - hidden on mobile when chat is selected */}
          <div
            className={`${showChatList ? "flex" : "hidden"} md:flex w-full md:w-72 lg:w-80 border-r border-border bg-card flex-col`}
          >
            <div className="p-4 border-b border-border">
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => {
                    setSelectedChat(convo)
                    setShowChatList(false) // Hide list on mobile when chat selected
                  }}
                  className={`w-full p-3 sm:p-4 text-left border-b border-border hover:bg-muted/50 transition-colors ${
                    selectedChat.id === convo.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm truncate">{convo.name}</p>
                        <span className="text-xs text-muted-foreground ml-2">{convo.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                    </div>
                    {convo.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area - full width on mobile */}
          <div className={`${!showChatList ? "flex" : "hidden"} md:flex flex-1 flex-col`}>
            {/* Chat Header */}
            <div className="h-14 sm:h-16 border-b border-border bg-card flex items-center justify-between px-3 sm:px-6">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={() => setShowChatList(true)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">{selectedChat.name}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">AI Assistant</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 text-xs">
                Online
              </Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-r from-primary to-accent"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    )}
                  </div>
                  <Card
                    className={`max-w-[85%] sm:max-w-[70%] p-3 sm:p-4 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</p>
                  </Card>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-border bg-card">
              <div className="flex items-center gap-2 sm:gap-3">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 text-sm"
                />
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
