"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { EmailList, type Email } from "@/components/app/email-list"
import { EmailContent } from "@/components/app/email-content"

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
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

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

  const fetchEmails = useCallback(async (pageToken?: string | null) => {
    const url = new URL("http://localhost:3000/api/gmail/emails")
    if (pageToken) url.searchParams.set("pageToken", pageToken)

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    })
    if (!res.ok) throw new Error(`Failed to fetch emails: ${res.status}`)
    const json: EmailsResponse = await res.json()
    if (!json.success) throw new Error(json.message || "Failed to fetch emails")
    return json
  }, [])

  // Initial load
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchEmails(null)
        if (!mounted) return
        const mapped = data.data.map(mapToEmail)
        setEmails(mapped)
        setSelectedEmail(mapped[0] ?? null)
        setNextPageToken(data.meta.nextPageToken ?? null)
        setHasMore(Boolean(data.meta.hasMore ?? data.meta.nextPageToken))
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

  const handleEndReached = useCallback(async () => {
    if (loadingMore || !hasMore) return
    try {
      setLoadingMore(true)
      const data = await fetchEmails(nextPageToken)
      const mapped = data.data.map(mapToEmail)
      setEmails(prev => [...prev, ...mapped])
      setNextPageToken(data.meta.nextPageToken ?? null)
      setHasMore(Boolean(data.meta.hasMore ?? data.meta.nextPageToken))
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
            onSelect={setSelectedEmail}
            onEndReached={handleEndReached}
            loadingMore={loadingMore}
            hasMore={hasMore}
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
