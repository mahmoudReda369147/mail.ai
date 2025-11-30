"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Send, Sparkles, User, Bot, Plus, ArrowLeft, Pin } from "lucide-react"

const conversations = [
  {
    id: "1",
    name: "Email Reply Assistant",
    lastMessage: "How can I help you with your email?",
    time: "Just now",
    unread: true,
    pinned: true,
  },
  {
    id: "2",
    name: "Template Generator",
    lastMessage: "Here's a template for your request...",
    time: "2h ago",
    unread: false,
    pinned: false,
  },
  { id: "3", name: "Writing Coach", lastMessage: "Great improvement on the tone!", time: "Yesterday", unread: false, pinned: false },
]

const messages = [
  {
    id: "1",
    role: "bot",
    content: "Hello! I'm your ReplyGenie AI assistant. How can I help you craft the perfect email today?",
    createdAt: "10:01",
  },
  {
    id: "2",
    role: "user",
    content: "I need help writing a professional response to a client who is upset about a delayed project.",
    createdAt: "10:02",
  },
  {
    id: "3",
    role: "bot",
    content:
      "I understand. Here's a suggested response that acknowledges their concerns while maintaining professionalism:\n\n\"Dear [Client Name],\n\nThank you for reaching out, and I sincerely apologize for the delay in our project timeline. I understand how frustrating this must be, and I take full responsibility for the inconvenience caused.\n\nWe have identified the issues that caused the delay and have implemented measures to ensure we get back on track. I'd like to schedule a call this week to discuss our updated timeline and address any concerns you may have.\n\nYour satisfaction is our priority, and we are committed to delivering exceptional results.\n\nBest regards,\n[Your Name]\"",
    createdAt: "10:03",
  },
  { id: "4", role: "user", content: "Can you make it a bit shorter and more direct?", createdAt: "10:04" },
  {
    id: "5",
    role: "bot",
    content:
      "Of course! Here's a more concise version:\n\n\"Dear [Client Name],\n\nI apologize for the project delay. We've resolved the issues and are back on track. I'd like to schedule a brief call to discuss our updated timeline.\n\nPlease let me know your availability this week.\n\nBest regards,\n[Your Name]\"",
    createdAt: "10:05",
  },
]

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [composer, setComposer] = useState("")
  const [showChatList, setShowChatList] = useState(true)
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<"all" | "unread" | "pinned">("all")
  const filteredConversations = conversations
    .filter((c) => [c.name, c.lastMessage].join(" ").toLowerCase().includes(query.toLowerCase()))
    .filter((c) => (tab === "all" ? true : tab === "unread" ? c.unread : c.pinned))

  const handleSend = () => {
    if (!composer.trim()) return
    // Hook up to your backend/send function here
    setComposer("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Sidebar />
      <div className="lg:ms-72">
        <TopBar />
        <div className="flex h-[calc(100vh-64px)]">
          {/* Conversations List - hidden on mobile when chat is selected */}
          <div
            className={`${showChatList ? "flex" : "hidden"} md:flex w-full md:w-80 xl:w-96 border-r border-border bg-card flex-col`}
          >
            <div className="p-3 sm:p-4 border-b border-border space-y-2">
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
                <Badge variant="secondary" className="ml-auto">{conversations.length} chats</Badge>
              </div>
              <Input
                placeholder="Search conversations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9"
              />
              <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="mt-1">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="pinned">Pinned</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => {
                    setSelectedChat(convo)
                    setShowChatList(false)
                  }}
                  className={`w-full p-3 sm:p-4 text-left border-b border-border hover:bg-muted/60 transition-colors ${
                    selectedChat.id === convo.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-foreground text-sm truncate flex items-center gap-1.5">
                          {convo.name}
                          {convo.pinned && <Pin className="w-3.5 h-3.5 text-muted-foreground" />}
                        </p>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{convo.time}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                    </div>
                    {convo.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                  </div>
                </button>
              ))}
              {filteredConversations.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">No conversations found</div>
              )}
            </div>
          </div>

          {/* Chat Area - full width on mobile */}
          <div className={`${!showChatList ? "flex" : "hidden"} md:flex flex-1 flex-col`}>
            {/* Chat Header */}
            <div className="h-14 sm:h-16 border-b border-border bg-card/80 backdrop-blur supports-backdrop-filter:bg-card/60 flex items-center justify-between px-3 sm:px-6">
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
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
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
                  <div className="flex flex-col items-start max-w-[85%] sm:max-w-[70%]">
                    <Card
                      className={`w-fit p-3 sm:p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm"
                      }`}
                    >
                      <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </Card>
                    <span className={`mt-1 text-[10px] sm:text-xs text-muted-foreground ${
                      message.role === "user" ? "self-end" : "self-start"
                    }`}>
                      {"createdAt" in message ? (message as any).createdAt : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-border bg-card">
              <div className="mx-auto w-full max-w-3xl">
                <div className="flex items-end gap-2 sm:gap-3">
                  <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                    <Sparkles className="w-5 h-5" />
                  </Button>
                  <Textarea
                    placeholder="Type your message... (Shift+Enter for new line)"
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    className="flex-1 text-sm resize-none h-10 sm:h-12 max-h-40"
                    rows={1}
                  />
                  <Button
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    size="icon"
                    disabled={!composer.trim()}
                    onClick={handleSend}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-2 hidden sm:flex gap-2 text-xs text-muted-foreground">
                  <span>Enter to send</span>
                  <span>•</span>
                  <span>Shift+Enter for new line</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

