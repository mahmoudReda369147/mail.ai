"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Send, Copy, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useEmailDetail } from "@/hooks/use-email-detail"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, Mail } from "lucide-react"

const tones = [
  { id: "professional", label: "Professional" },
  { id: "friendly", label: "Friendly" },
  { id: "short", label: "Short" },
]

const sampleReply =""

export default function EmailViewerPage() {
  const searchParams = useSearchParams()
  const emailId = searchParams.get('id')
  const { email: emailDetail, loading, error } = useEmailDetail(emailId)
  const [prompt, setPrompt] = useState("")
  const [generatedReply, setGeneratedReply] = useState<string | null>(null)
  const [summaryLanguage, setSummaryLanguage] = useState<'en' | 'ar'>('en')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt.trim() || !emailDetail?.id) return
    
    setIsGenerating(true)
    try {
      const response = await api.post(`/gmail/emails/reply/${emailDetail.id}`, {
        prompet: prompt.trim()
      })
      
      if (response.data?.reply) {
        setGeneratedReply(response.data.reply)
      } else {
        throw new Error('No reply generated')
      }
    } catch (err) {
      console.error('Failed to generate reply:', err)
      // Fallback to sample reply for now
      setGeneratedReply(sampleReply)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = async () => {
    setGeneratedReply(null)
    await handleGenerate()
  }

  const handleCopy = () => {
    if (generatedReply) {
      navigator.clipboard.writeText(generatedReply)
      toast({
        title: "Copied!",
        description: "Reply copied to clipboard",
      })
    }
  }

  const handleSendReply = async () => {
    if (!generatedReply?.trim() || !emailDetail?.from) return
    
    setIsSending(true)
    try {
      // Extract email address from "Name <email>" format
      const emailMatch = emailDetail.from.match(/<(.+?)>/)
      const toEmail = emailMatch ? emailMatch[1] : emailDetail.from
      
      const response = await api.post('/gmail/send', {
        to: toEmail,
        subject: emailDetail.subject,
        body: generatedReply.trim()
      })
      
      if (response.data?.success) {
        toast({
          title: "Email Sent Successfully!",
          description: `Your reply has been sent to ${toEmail}`,
          action: (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Sent</span>
            </div>
          ),
        })
        
        // Clear the reply after successful send
        setGeneratedReply(null)
        setPrompt("")
      } else {
        throw new Error(response.data?.message || 'Failed to send email')
      }
    } catch (err) {
      console.error('Failed to send reply:', err)
      toast({
        title: "Failed to Send",
        description: err instanceof Error ? err.message : "Unable to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:ml-64">
          <TopBar />
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground animate-pulse mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Loading email...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !emailDetail) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="lg:ml-64">
          <TopBar />
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-red-600">Failed to load email</p>
              <p className="text-sm text-muted-foreground mt-2">{error || 'Email not found'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)]">
          {/* Left Side - Email Content */}
          <div className="flex-1 bg-background/60 p-4 sm:p-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border">
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-5 sm:p-6 lg:p-8 space-y-6">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary">Received</Badge>
                <span className="text-xs text-muted-foreground">{emailDetail.date}</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Email subject
                </p>
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground leading-snug">
                  {emailDetail.subject}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">From: {emailDetail.from}</span>
                <span>•</span>
                <span>To: {emailDetail.to}</span>
              </div>

              {/* AI Summary Card */}
              {(emailDetail.summary_en || emailDetail.summary_ar) && (
                <Card className="bg-linear-to-r from-primary/5 to-accent/5 border-primary/20 backdrop-blur-sm p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">AI Summary</span>
                    </div>
                    <Badge className="bg-primary/15 text-primary border-primary/20 text-xs">
                      Priority: {emailDetail.priority_score}/100
                    </Badge>
                  </div>

                  {/* Language Toggle */}
                  <div className="flex items-center gap-2 mb-3">
                    <Button
                      variant={summaryLanguage === 'en' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSummaryLanguage('en')}
                      className="text-xs"
                    >
                      English
                    </Button>
                    <Button
                      variant={summaryLanguage === 'ar' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSummaryLanguage('ar')}
                      className="text-xs"
                    >
                      العربية
                    </Button>
                  </div>

                  <p className="text-sm leading-relaxed text-foreground/90">
                    {summaryLanguage === 'en' ? emailDetail.summary_en : emailDetail.summary_ar}
                  </p>
                </Card>
              )}

              <Card className="bg-muted/60 border-0 p-4 sm:p-5">
                <div className="prose prose-sm max-w-none">
                  {emailDetail.htmlBody ? (
                    <div dangerouslySetInnerHTML={{ __html: emailDetail.htmlBody }} />
                  ) : (
                    <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line text-left">
                      {emailDetail.textBody}
                    </p>
                  )}
                </div>
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
              <label className="text-sm font-medium text-foreground mb-3 block">Custom Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-24 p-3 bg-background border-2 border-border/50 rounded-lg text-foreground text-sm leading-relaxed resize-none focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/50"
                placeholder="Describe how you want the AI to respond (e.g., 'Write a professional reply', 'Be friendly and casual', 'Keep it short and direct')..."
              />
            </div>

            {!generatedReply ? (
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !prompt.trim()} 
                className="w-full h-11 sm:h-12"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate AI Reply"}
              </Button>
            ) : (
              <div className="space-y-4">
                <Card className="bg-card border-border p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Generated Reply</span>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                      Custom Prompt
                    </Badge>
                  </div>
                  <div className="relative">
                    <textarea
                      value={generatedReply}
                      onChange={(e) => setGeneratedReply(e.target.value)}
                      className="w-full min-h-[400px] max-h-[600px] p-4 bg-background border-2 border-border/50 rounded-xl text-foreground text-sm leading-relaxed resize-y focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/50"
                      placeholder="AI-generated reply will appear here..."
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/70">
                      {generatedReply.length} characters
                    </div>
                  </div>
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

                <Button 
                  onClick={handleSendReply} 
                  disabled={isSending || !generatedReply?.trim()} 
                  className="w-full h-11 sm:h-12"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
