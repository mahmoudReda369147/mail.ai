"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Star, Paperclip, Archive, Trash2, MoreVertical, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface Email {
  id: string
  sender: string
  subject: string
  preview: string
  time: string
  unread: boolean
  content?: string
}

interface EmailListProps {
  emails: Email[]
  selectedId?: string
  onSelect: (email: Email) => void
  onEndReached?: () => void
  loadingMore?: boolean
  hasMore?: boolean
  onEmailDeleted?: (emailId: string) => void
  onRefetch?: () => void
}

export function EmailList({ emails, selectedId, onSelect, onEndReached, loadingMore = false, hasMore = true, onEmailDeleted, onRefetch }: EmailListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null)
  const unreadCount = emails.filter(e => e.unread).length

  const handleDeleteEmail = async (emailId: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent selecting the email when clicking delete
    setEmailToDelete(emailId)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!emailToDelete) return
    
    try {
      await api.delete(`/gmail/emails/${emailToDelete}`)
      
      toast({
        title: "Email deleted",
        description: "The email has been successfully deleted.",
        variant: "default",
        className: "bg-green-500 text-white border-green-600",
        action: <CheckCircle className="w-5 h-5 text-white" />,
      })
      
      // Notify parent component to update the email list
      if (onEmailDeleted) {
        onEmailDeleted(emailToDelete)
      }
      
      // Navigate to inbox after successful deletion
      router.push('/inbox')
      
      // Refetch emails to get updated list
      if (onRefetch) {
        onRefetch()
      }
    } catch (error) {
      console.error('Failed to delete email:', error)
      toast({
        title: "Failed to delete email",
        description: "There was an error deleting the email. Please try again.",
        variant: "destructive",
        action: <XCircle className="w-5 h-5" />,
      })
    } finally {
      setDeleteConfirmOpen(false)
      setEmailToDelete(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmOpen(false)
    setEmailToDelete(null)
  }

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
    <div className="w-full md:w-[380px] lg:w-[420px] border-r border-border/50 h-full overflow-hidden shrink-0 bg-card/30 backdrop-blur-sm flex flex-col">
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
                    <button 
                      className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      onClick={(e) => handleDeleteEmail(email.id, e)}
                    >
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
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Email</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this email? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

