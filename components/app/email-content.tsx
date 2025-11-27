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
      <div className="flex-1 flex items-center justify-center bg-background text-muted-foreground">
        <div className="text-center px-6">
          <p className="text-sm">Select an email from the list to see its details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background/60 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto bg-card border border-white/10 rounded-2xl shadow-glow p-5 sm:p-6 lg:p-7 space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Email subject</p>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground leading-snug break-words">
            {email.subject}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{email.sender}</span>
          <span>•</span>
          <span>{email.time}</span>
        </div>

        <div className="bg-muted/60 rounded-xl p-5 sm:p-6">
          <p className="text-sm sm:text-base text-foreground leading-relaxed space-y-1">
            Hi team,
            <br />
            <br />I wanted to share the results from our latest Q4 marketing campaign. The numbers are looking great,
            and I think we have some valuable insights to discuss.
            <br />
            <br />
            Key highlights:
            <br />- Email open rates increased by 25%
            <br />- Click-through rates improved by 18%
            <br />- Overall conversion was up 12% compared to Q3
            <br />
            <br />
            I'd love to schedule a meeting to go over these results in detail and discuss our strategy for Q1.
            <br />
            <br />
            Best regards,
            <br />
            {email.sender}
          </p>
        </div>

        <Button asChild>
          <Link href={`/email-viewer?id=${email.id}`}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate AI Reply
          </Link>
        </Button>
      </div>
    </div>
  )
}
