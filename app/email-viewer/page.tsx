"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Send, Copy, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const tones = [
  { id: "professional", label: "Professional" },
  { id: "friendly", label: "Friendly" },
  { id: "short", label: "Short" },
]

const sampleReply = `Hi Sarah,

Thank you for sharing these impressive Q4 marketing campaign results! The improvements across all metrics are truly encouraging.

I'd be happy to schedule a meeting to discuss these insights in detail. Please let me know your availability this week, and I'll send out a calendar invite.

Looking forward to our discussion and planning for Q1.

Best regards`

export default function EmailViewerPage() {
  const [selectedTone, setSelectedTone] = useState("professional")
  const [generatedReply, setGeneratedReply] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setGeneratedReply(sampleReply)
    setIsGenerating(false)
  }

  const handleRegenerate = async () => {
    setGeneratedReply(null)
    await handleGenerate()
  }

  const handleCopy = () => {
    if (generatedReply) {
      navigator.clipboard.writeText(generatedReply)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)]">
          {/* Left Side - Email Content */}
          <div className="flex-1 bg-background/60 p-4 sm:p-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border">
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-5 sm:p-6 lg:p-7 space-y-6">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary">Received</Badge>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Email subject
                </p>
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground leading-snug">
                  Q4 Marketing Campaign Review
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">From: Sarah Johnson</span>
                <span>•</span>
                <span>Product Manager</span>
              </div>

              <Card className="bg-muted/60 border-0 p-4 sm:p-5">
                <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
                  Hi team, I wanted to share the results from our latest Q4 marketing campaign. The numbers are looking
                  great, and I think we have some valuable insights to discuss.
                  
                  Key highlights:
                  
                  - Email open rates increased by 25%
                  - Click-through rates improved by 18%
                  - Overall conversion was up 12% compared to Q3
                  
                  The team has done an outstanding job executing our strategy. I believe these results position us well
                  for an even stronger Q1. I'd love to schedule a meeting to go over these results in detail and discuss
                  our strategy for the upcoming quarter.
                  
                  Best regards,
                  
                  Sarah Johnson
                  Product Manager
                </p>
              </Card>
            </div>
          </div>

          {/* Right Side - AI Reply Generator */}
          <div className="w-full lg:w-[400px] xl:w-[480px] p-4 sm:p-6 overflow-y-auto bg-background flex-shrink-0 border-t lg:border-t-0 lg:border-l border-border">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">AI Reply Generator</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Generate a response in seconds</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-3 block">Select Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={cn(
                      "px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                      selectedTone === tone.id
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                        : "bg-card border border-border text-foreground hover:bg-muted",
                    )}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            {!generatedReply ? (
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full h-11 sm:h-12">
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate AI Reply"}
              </Button>
            ) : (
              <div className="space-y-4">
                <Card className="bg-card border-border p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Generated Reply</span>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                      {tones.find((t) => t.id === selectedTone)?.label}
                    </Badge>
                  </div>
                  <p className="text-foreground leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                    {generatedReply}
                  </p>
                </Card>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button onClick={handleRegenerate} className="flex-1 h-10 sm:h-11">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button onClick={handleCopy} className="flex-1 h-10 sm:h-11">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <Button className="w-full h-11 sm:h-12">
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
