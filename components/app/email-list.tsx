"use client"

import { cn } from "@/lib/utils"

export interface Email {
  id: string
  sender: string
  subject: string
  preview: string
  time: string
  unread: boolean
}

interface EmailListProps {
  emails: Email[]
  selectedId?: string
  onSelect: (email: Email) => void
}

export function EmailList({ emails, selectedId, onSelect }: EmailListProps) {
  return (
    <div className="w-full md:w-80 lg:w-96 border-r border-sidebar-border h-full overflow-y-auto flex-shrink-0 bg-sidebar">
      <div className="sticky top-0 z-10 bg-sidebar/95 backdrop-blur border-b border-sidebar-border px-4 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Inbox</h2>
          <p className="text-xs text-muted-foreground/80">{emails.length} conversations</p>
        </div>
      </div>
      <div className="divide-y divide-border">
        {emails.map((email) => (
          <button
            key={email.id}
            onClick={() => onSelect(email)}
            className={cn(
              "w-full text-left px-4 py-3 group transition-colors border-2 border-transparent hover:bg-primary/5 focus-visible:outline-none focus-visible:bg-primary/10",
              selectedId === email.id && "bg-primary/15 border-primary",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0",
                  email.unread
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {email.sender.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={cn(
                      "text-sm truncate",
                      email.unread ? "font-semibold text-foreground" : "text-foreground",
                    )}
                  >
                    {email.sender}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">
                    {email.time}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm truncate mb-0.5",
                    email.unread ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {email.subject}
                </p>
                <p className="text-xs text-muted-foreground/90 line-clamp-2">
                  {email.preview}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
