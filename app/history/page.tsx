"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail, Copy, Trash2, Eye, Filter, Calendar } from "lucide-react"

const historyItems = [
  {
    id: "1",
    originalSubject: "Q4 Marketing Campaign Review",
    replyPreview: "Thank you for sharing the campaign results. The metrics look promising...",
    tone: "Professional",
    timestamp: "2 hours ago",
    date: "Today",
  },
  {
    id: "2",
    originalSubject: "Meeting Notes - Product Roadmap",
    replyPreview: "Great summary of the meeting! I'd like to add a few points regarding...",
    tone: "Friendly",
    timestamp: "5 hours ago",
    date: "Today",
  },
  {
    id: "3",
    originalSubject: "Re: Budget Proposal",
    replyPreview: "I've reviewed the budget proposal and have some suggestions for optimization...",
    tone: "Formal",
    timestamp: "Yesterday",
    date: "Yesterday",
  },
  {
    id: "4",
    originalSubject: "New Feature Request",
    replyPreview: "Thanks for the feature request. I'll discuss this with the team and get back to you...",
    tone: "Concise",
    timestamp: "2 days ago",
    date: "Dec 18",
  },
  {
    id: "5",
    originalSubject: "Partnership Opportunity",
    replyPreview: "Thank you for reaching out about the partnership. We're definitely interested...",
    tone: "Professional",
    timestamp: "3 days ago",
    date: "Dec 17",
  },
  {
    id: "6",
    originalSubject: "Weekly Team Update",
    replyPreview: "Great progress this week! Here are my thoughts on the next steps...",
    tone: "Friendly",
    timestamp: "1 week ago",
    date: "Dec 13",
  },
]

const toneColors: Record<string, string> = {
  Professional: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Friendly: "bg-green-500/10 text-green-500 border-green-500/20",
  Concise: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Formal: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

export default function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")

  const groupedHistory = historyItems.reduce(
    (acc, item) => {
      if (!acc[item.date]) acc[item.date] = []
      acc[item.date].push(item)
      return acc
    },
    {} as Record<string, typeof historyItems>,
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                History
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">View your past AI-generated replies</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">{date}</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow group">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <h4 className="font-medium text-foreground text-sm sm:text-base truncate">
                                  {item.originalSubject}
                                </h4>
                                <Badge variant="outline" className={`${toneColors[item.tone]} w-fit`}>
                                  {item.tone}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.replyPreview}</p>
                              <p className="text-xs text-muted-foreground mt-2">{item.timestamp}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity self-end sm:self-start">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
