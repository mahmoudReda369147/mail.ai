import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import type { Email } from "./email-list"
import Link from "next/link"
import { useEmailDetail } from "@/hooks/use-email-detail"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EmailContentProps {
  email: Email | null
}

export function EmailContent({ email }: EmailContentProps) {
  const searchParams = useSearchParams()
  const emailId = searchParams.get('id')
  const { email: emailDetail, loading, error } = useEmailDetail(emailId)
  const [summaryLanguage, setSummaryLanguage] = useState<'en' | 'ar'>('en')

  // Use the detailed email data if available, otherwise fall back to the basic email prop
  const displayEmail = emailDetail ? {
    ...email,
    sender: emailDetail.from,
    subject: emailDetail.subject,
    time: emailDetail.date,
    content: emailDetail.htmlBody || emailDetail.textBody
  } : email

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/30 text-muted-foreground">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-muted-foreground/50 animate-pulse" />
          </div>
          <p className="text-base font-medium">Loading email...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/30 text-muted-foreground">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-base font-medium text-red-600">Failed to load email</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      </div>
    )
  }

  if (!displayEmail) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/30 text-muted-foreground">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <p className="text-base font-medium">Select an email to view its content</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Choose a message from the list to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background/30 backdrop-blur-sm p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Email Header Card */}
        <div className="bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          {/* Sender Info */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
              {displayEmail.sender.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground mb-1">{displayEmail.sender}</h2>
              <p className="text-sm text-muted-foreground">to me</p>
            </div>
            <div className="text-sm text-muted-foreground font-medium shrink-0">
              {displayEmail.time}
            </div>
          </div>

          {/* Subject */}
          <div className="border-t border-border/50 pt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight break-words">
              {displayEmail.subject}
            </h1>
          </div>
        </div>

        {/* AI Summary Card */}
        {emailDetail && (emailDetail.summary_en || emailDetail.summary_ar) && (
          <div className="bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">AI Summary</h3>
                  <p className="text-sm text-muted-foreground">Smart email analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/15 text-primary border-primary/20 font-semibold">
                  Priority: {emailDetail.priority_score}/100
                </Badge>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-foreground/70">English</span>
              <button
                onClick={() => setSummaryLanguage(summaryLanguage === 'en' ? 'ar' : 'en')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                role="switch"
                aria-checked={summaryLanguage === 'ar'}
              >
                <span className="sr-only">Toggle language</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    summaryLanguage === 'ar' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span 
                className={`text-sm font-medium ${
                  summaryLanguage === 'ar' ? 'arabic-text text-foreground' : 'text-foreground/70'
                }`}
                dir={summaryLanguage === 'ar' ? 'rtl' : 'ltr'}
                lang={summaryLanguage === 'ar' ? 'ar' : 'en'}
              >
                العربية
              </span>
            </div>

            {/* Summary Content */}
            <div className="bg-background/50 rounded-lg p-4 border border-border/50">
              <p 
                className={`text-sm leading-relaxed text-foreground/90 ${
                  summaryLanguage === 'ar' ? 'arabic-text' : ''
                }`}
                dir={summaryLanguage === 'ar' ? 'rtl' : 'ltr'}
                lang={summaryLanguage === 'ar' ? 'ar' : 'en'}
              >
                {summaryLanguage === 'en' ? emailDetail.summary_en : emailDetail.summary_ar}
              </p>
            </div>
          </div>
        )}
        

        {/* Email Body Card */}
        <div className="bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl  p-6 sm:p-8 mb-6">

          <div className="prose prose-sm sm:prose-base max-w-none">
            {displayEmail.content ? (
              displayEmail.content.includes('<!DOCTYPE html') || displayEmail.content.includes('<html') ? (
                <div 
                  className="text-base text-foreground/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: displayEmail.content }}
                />
              ) : (
                <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                  {displayEmail.content}
                </p>
              )
            ) : (
              <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                No content available
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="gradient-bg hover:opacity-90 h-12 shadow-md hover:shadow-glow transition-all duration-300 font-semibold text-base flex-1 sm:flex-none">
            <Link href={`/email-viewer?id=${displayEmail.id}`}>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate AI Reply
            </Link>
          </Button>
          <Button variant="outline" className="h-12 border-2 border-border hover:border-primary/30 font-semibold text-base bg-transparent">
            Forward
          </Button>
          <Button variant="outline" className="h-12 border-2 border-border hover:border-primary/30 font-semibold text-base bg-transparent">
            Archive
          </Button>
        </div>
      </div>
    </div>
  )
}
