"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Zap, Copy, RefreshCw, Sparkles, ThumbsUp, ThumbsDown, Check, Wand2 } from "lucide-react"

const toneOptions = [
  { id: "professional", label: "Professional", icon: "💼", color: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20" },
  { id: "friendly", label: "Friendly", icon: "😊", color: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20" },
  { id: "concise", label: "Concise", icon: "⚡", color: "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20" },
  { id: "formal", label: "Formal", icon: "🎩", color: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20" },
  { id: "casual", label: "Casual", icon: "👋", color: "bg-pink-500/10 text-pink-500 border-pink-500/20 hover:bg-pink-500/20" },
]

const suggestedReplies = [
  {
    id: "1",
    tone: "Professional",
    toneIcon: "💼",
    content:
      "Thank you for reaching out. I appreciate your interest in our services and would be happy to schedule a call to discuss your requirements in detail. Please let me know your availability this week.",
    wordCount: 32,
  },
  {
    id: "2",
    tone: "Friendly",
    toneIcon: "😊",
    content:
      "Hey! Thanks so much for getting in touch. I'd love to chat more about this - sounds like an exciting opportunity! When works best for a quick call?",
    wordCount: 29,
  },
  {
    id: "3",
    tone: "Concise",
    toneIcon: "⚡",
    content: "Thanks for your email. I'm available for a call this week. Please share your preferred times.",
    wordCount: 16,
  },
  {
    id: "4",
    tone: "Formal",
    toneIcon: "🎩",
    content: "Dear sender, I acknowledge receipt of your correspondence. I would be pleased to arrange a telephone conference at your earliest convenience. Kindly advise on suitable dates and times.",
    wordCount: 30,
  },
]

export default function SmartRepliesPage() {
  const [inputEmail, setInputEmail] = useState("")
  const [selectedTone, setSelectedTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 1500)
  }

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Sidebar />
      <div className="lg:ms-72">
        <TopBar />
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                <Zap className="w-6 h-6 text-white" />
              </div>
              Smart Replies
            </h1>
            <p className="text-lg text-muted-foreground">
              Generate AI-powered responses tailored to your preferred tone
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-8">
            {/* Input Section */}
            <div className="xl:col-span-2">
              <Card className="border-2 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-6 sm:p-8 border-b border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Wand2 className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">Compose Reply</CardTitle>
                  </div>
                  <CardDescription className="text-base">Paste the email you want to reply to</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6 sm:p-8">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block">Email Content</label>
                    <Textarea
                      placeholder="Paste or type the email content here...&#10;&#10;Example: Hi, I'd like to schedule a meeting to discuss the project timeline..."
                      className="min-h-[200px] resize-none border-2 border-border focus:border-primary rounded-xl text-base bg-background/50 p-4"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block">Select Tone</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {toneOptions.map((tone) => (
                        <button
                          key={tone.id}
                          onClick={() => setSelectedTone(tone.id)}
                          className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                            selectedTone === tone.id
                              ? tone.color + " scale-105 shadow-md"
                              : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                          }`}
                        >
                          <span className="text-2xl">{tone.icon}</span>
                          <span>{tone.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full gradient-bg hover:opacity-90 h-14 shadow-md hover:shadow-glow transition-all duration-300 font-bold text-base"
                    onClick={handleGenerate}
                    disabled={isGenerating || !inputEmail}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Generating Replies...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Smart Replies
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions Section */}
            <div className="xl:col-span-3 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground">AI-Generated Replies</h3>
                <Badge className="bg-primary/15 text-primary border-primary/20 font-semibold px-3 py-1">
                  {suggestedReplies.length} options
                </Badge>
              </div>

              <div className="grid gap-4">
                {suggestedReplies.map((reply, index) => (
                  <Card
                    key={reply.id}
                    className="border-2 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{reply.toneIcon}</span>
                          <div>
                            <Badge variant="secondary" className="font-semibold text-sm">
                              {reply.tone}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {reply.wordCount} words
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 rounded-lg hover:bg-green-500/10 text-muted-foreground hover:text-green-600 transition-all duration-200"
                            title="Like"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-600 transition-all duration-200"
                            title="Dislike"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCopy(reply.id, reply.content)}
                            className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
                            title="Copy to clipboard"
                          >
                            {copiedId === reply.id ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-base text-foreground/90 leading-relaxed">{reply.content}</p>
                      <div className="mt-4 pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="outline"
                          className="w-full border-2 border-border hover:border-primary/30 font-semibold h-10 bg-transparent"
                        >
                          Use This Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
