"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Zap, Copy, RefreshCw, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react"

const toneOptions = [
  { id: "professional", label: "Professional", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { id: "friendly", label: "Friendly", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  { id: "concise", label: "Concise", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  { id: "formal", label: "Formal", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
]

const suggestedReplies = [
  {
    id: "1",
    tone: "Professional",
    content:
      "Thank you for reaching out. I appreciate your interest in our services and would be happy to schedule a call to discuss your requirements in detail. Please let me know your availability this week.",
  },
  {
    id: "2",
    tone: "Friendly",
    content:
      "Hey! Thanks so much for getting in touch. I'd love to chat more about this - sounds like an exciting opportunity! When works best for a quick call?",
  },
  {
    id: "3",
    tone: "Concise",
    content: "Thanks for your email. I'm available for a call this week. Please share your preferred times.",
  },
]

export default function SmartRepliesPage() {
  const [inputEmail, setInputEmail] = useState("")
  const [selectedTone, setSelectedTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              Smart Replies
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Generate AI-powered responses for your emails
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Email Content</CardTitle>
                <CardDescription>Paste the email you want to reply to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                <Textarea
                  placeholder="Paste the email content here..."
                  className="min-h-[150px] sm:min-h-[200px] resize-none"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                />

                <div>
                  <p className="text-sm font-medium mb-2">Select Tone</p>
                  <div className="flex flex-wrap gap-2">
                    {toneOptions.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id)}
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                          selectedTone === tone.id
                            ? tone.color + " ring-2 ring-offset-2 ring-primary/50"
                            : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Smart Reply
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Suggestions Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Suggested Replies</h3>
              {suggestedReplies.map((reply) => (
                <Card key={reply.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{reply.tone}</Badge>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{reply.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
