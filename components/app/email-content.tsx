import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import type { Email } from "./email-list"
import Link from "next/link"

interface EmailContentProps {
  email: Email | null
}

export function EmailContent({ email }: EmailContentProps) {
  if (!email) {
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
              {email.sender.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground mb-1">{email.sender}</h2>
              <p className="text-sm text-muted-foreground">to me</p>
            </div>
            <div className="text-sm text-muted-foreground font-medium shrink-0">
              {email.time}
            </div>
          </div>

          {/* Subject */}
          <div className="border-t border-border/50 pt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight break-words">
              {email.subject}
            </h1>
          </div>
        </div>

        {/* Email Body Card */}
        <div className="bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="prose prose-sm sm:prose-base max-w-none">
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              Hi team,

              I wanted to share the results from our latest Q4 marketing campaign. The numbers are looking great, and I think we have some valuable insights to discuss.

              Key highlights:
              • Email open rates increased by 25%
              • Click-through rates improved by 18%
              • Overall conversion was up 12% compared to Q3

              I'd love to schedule a meeting to go over these results in detail and discuss our strategy for Q1.

              Best regards,
              {email.sender}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="gradient-bg hover:opacity-90 h-12 shadow-md hover:shadow-glow transition-all duration-300 font-semibold text-base flex-1 sm:flex-none">
            <Link href={`/email-viewer?id=${email.id}`}>
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
