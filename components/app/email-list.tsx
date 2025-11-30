"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Star, Paperclip, Archive, Trash2, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
  onEndReached?: () => void
  loadingMore?: boolean
  hasMore?: boolean
}

export function EmailList({ emails, selectedId, onSelect, onEndReached, loadingMore = false, hasMore = true }: EmailListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const unreadCount = emails.filter(e => e.unread).length

  // Observe end-of-list to trigger pagination
  useEffect(() => {
    if (!onEndReached) return
    const root = scrollRef.current
    const target = sentinelRef.current
    if (!root || !target) return

    let ticking = false
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !loadingMore && hasMore && !ticking) {
          ticking = true
          onEndReached()
          // Small timeout debounce to avoid rapid re-calls while still intersecting
          setTimeout(() => { ticking = false }, 500)
        }
      },
      { root, threshold: 0.1 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [onEndReached, loadingMore, hasMore])

  return (
    <div className="w-full md:w-[380px] lg:w-[420px] border-r border-border/50 h-full overflow-hidden flex-shrink-0 bg-card/30 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border/50 px-5 py-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-foreground">Inbox</h2>
          {unreadCount > 0 && (
            <Badge className="bg-primary/15 text-primary border-primary/20 font-semibold">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{emails.length} conversations</p>
      </div>

      {/* Email List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/30">
          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => onSelect(email)}
              className={cn(
                "w-full text-left px-5 py-4 group transition-all duration-200 relative hover:bg-muted/50",
                selectedId === email.id && "bg-primary/10 border-l-4 border-primary shadow-sm",
              )}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className={cn(
                    "mt-1 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-200",
                    email.unread
                      ? "gradient-bg text-white shadow-md"
                      : "bg-muted text-muted-foreground",
                    selectedId === email.id && "scale-105"
                  )}
                >
                  {email.sender.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span
                      className={cn(
                        "text-base truncate",
                        email.unread ? "font-bold text-foreground" : "font-medium text-foreground",
                      )}
                    >
                      {email.sender}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground font-medium">
                        {email.time}
                      </span>
                      {email.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                  </div>

                  <p
                    className={cn(
                      "text-sm truncate mb-2",
                      email.unread ? "font-semibold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {email.subject}
                  </p>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {email.preview}
                  </p>

                  {/* Actions - visible on hover */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-yellow-500/10 text-muted-foreground hover:text-yellow-600 transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors ml-auto">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </button>
          ))}
          {/* Sentinel & Footer */}
          <div ref={sentinelRef} />
          <div className="px-5 py-4 text-center text-sm text-muted-foreground">
            {loadingMore && (
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Loading more…
              </div>
            )}
            {!loadingMore && !hasMore && emails.length > 0 && (
              <span className="text-muted-foreground/70">You are all caught up</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

