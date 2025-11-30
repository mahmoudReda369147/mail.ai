import { useState, useEffect } from "react"
import { api } from "@/lib/api"

type EmailDetail = {
  id: string
  threadId: string
  snippet: string
  internalDate: string
  from: string
  to: string
  subject: string
  date: string
  textBody: string
  htmlBody: string
  attachments: any[]
  summary_ar: string
  summary_en: string
  priority_score: number
}

type EmailDetailResponse = {
  success: boolean
  message: string
  data: EmailDetail
  meta: null
}

export function useEmailDetail(emailId: string | null) {
  const [email, setEmail] = useState<EmailDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!emailId) {
      setEmail(null)
      setError(null)
      return
    }

    const fetchEmailDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<EmailDetailResponse>(`/gmail/emails/${emailId}`)
        if (response.data) {
          setEmail(response.data)
        } else {
          throw new Error('No email data received')
        }
      } catch (err) {
        console.error('Failed to fetch email detail:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch email')
        setEmail(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEmailDetail()
  }, [emailId])

  return { email, loading, error }
}