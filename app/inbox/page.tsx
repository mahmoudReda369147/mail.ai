"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { EmailList, type Email } from "@/components/app/email-list"
import { EmailContent } from "@/components/app/email-content"

const sampleEmails: Email[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    subject: "Q4 Marketing Campaign Review",
    preview: "Hi team, I wanted to share the results from our latest campaign...",
    time: "2h ago",
    unread: true,
  },
  {
    id: "2",
    sender: "Michael Chen",
    subject: "Meeting Notes - Product Roadmap",
    preview: "Following up on today's discussion about the product roadmap...",
    time: "5h ago",
    unread: true,
  },
  {
    id: "3",
    sender: "Emily Rodriguez",
    subject: "Re: Budget Proposal",
    preview: "Thanks for sending over the budget proposal. I've reviewed...",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    sender: "David Kim",
    subject: "New Feature Request",
    preview: "Our clients have been asking for a new reporting feature...",
    time: "2 days ago",
    unread: false,
  },
]

export default function InboxPage() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(sampleEmails[0])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          <EmailList emails={sampleEmails} selectedId={selectedEmail?.id} onSelect={setSelectedEmail} />
          <div className="hidden md:block flex-1">
            <EmailContent email={selectedEmail} />
          </div>
          {/* Mobile: Show email content as full screen overlay style */}
          {selectedEmail && (
            <div className="md:hidden flex-1 overflow-y-auto">
              <EmailContent email={selectedEmail} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
