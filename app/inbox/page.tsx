"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { EmailList, type Email } from "@/components/app/email-list"
import { EmailContent } from "@/components/app/email-content"
import { api } from "@/lib/api"

type GmailEmail = {
  id: string
  threadId: string
  snippet: string
  internalDate: string
  from: string
  to: string
  subject: string
  date: string
}

type EmailsResponse = {
  success: boolean
  message: string
  data: GmailEmail[]
  meta: {
    count: number
    pageSize: number
    nextPageToken?: string | null
    hasMore?: boolean
    resultSizeEstimate?: number
    q?: string | null
  }
}

export default function InboxPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  // Handle email selection - navigate to email detail page
  const handleEmailSelect = useCallback((email: Email) => {
    router.push(`/inbox?id=${email.id}`)
  }, [router])

  // Update selected email when URL parameter changes
  useEffect(() => {
    const emailId = searchParams.get('id')
    if (emailId) {
      const email = emails.find(e => e.id === emailId)
      setSelectedEmail(email || null)
    } else {
      setSelectedEmail(null)
    }
  }, [searchParams, emails])

  const mapToEmail = (item: GmailEmail): Email => {
    // sender: take name before < or the email address
    const senderRaw = item.from || "Unknown"
    const match = senderRaw.match(/^(.*?)\s*<(.+?)>$/)
    const sender = (match?.[1] || senderRaw || "").trim() || (match?.[2] || "Unknown")

    // preview: snippet
    const preview = item.snippet || ""

    // time: use the date string (already formatted) or fallback to internalDate
    const time = item.date || new Date(Number(item.internalDate || 0)).toLocaleString()

    return {
      id: item.id,
      sender,
      subject: item.subject || "(No subject)",
      preview,
      time,
      unread: false,
    }
  }

  const fetchEmails = useCallback(async (pageToken?: string | null): Promise<EmailsResponse> => {
    const endpoint = pageToken 
      ? `/gmail/emails?pageToken=${pageToken}`
      : "/gmail/emails"

    const response = await api.get<EmailsResponse>(endpoint)
    if (!response.data) {
      throw new Error('No email data received')
    }
    return response
  }, [])

  // Initial load
  const loadEmails = useCallback(async () => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchEmails(null)
        if (!mounted) return
        const mapped = (data.data || []).map(mapToEmail)
        setEmails(mapped)
        setSelectedEmail(mapped[0] ?? null)
        setNextPageToken(data.meta?.nextPageToken ?? null)
        setHasMore(Boolean(data.meta?.hasMore ?? data.meta?.nextPageToken))
      } catch (e) {
        console.error(e)
        setEmails([])
        setHasMore(false)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [fetchEmails])

  // Initial load
  useEffect(() => {
    loadEmails()
  }, [loadEmails])

  const handleEndReached = useCallback(async () => {
    if (loadingMore || !hasMore) return
    try {
      setLoadingMore(true)
      const data = await fetchEmails(nextPageToken)
      const mapped = (data.data || []).map(mapToEmail)
      setEmails(prev => [...prev, ...mapped])
      setNextPageToken(data.meta?.nextPageToken ?? null)
      setHasMore(Boolean(data.meta?.hasMore ?? data.meta?.nextPageToken))
    } catch (e) {
      console.error(e)
      setHasMore(false)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, fetchEmails, nextPageToken])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Sidebar />
      <div className="lg:ms-72">
        <TopBar />
        <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
          <EmailList
            emails={emails}
            selectedId={selectedEmail?.id}
            onSelect={handleEmailSelect}
            onEndReached={handleEndReached}
            loadingMore={loadingMore}
            hasMore={hasMore}
            onRefetch={loadEmails}
          />
          <div className="hidden md:flex flex-1">
            <EmailContent email={selectedEmail} />
          </div>
          {/* Mobile: Show email content as full screen overlay style */}
          {selectedEmail && (
            <div className="md:hidden flex-1">
              <EmailContent email={selectedEmail} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
