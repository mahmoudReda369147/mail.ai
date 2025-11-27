"use client"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Search, Edit2, Trash2, Star, Copy } from "lucide-react"

const templates = [
  {
    id: "1",
    name: "Meeting Follow-up",
    category: "Business",
    content:
      "Hi [Name], Thank you for taking the time to meet with me today. I wanted to follow up on our discussion about...",
    starred: true,
    usageCount: 45,
  },
  {
    id: "2",
    name: "Project Update",
    category: "Work",
    content: "Hi team, Here's a quick update on the project progress. We've completed the following milestones...",
    starred: true,
    usageCount: 32,
  },
  {
    id: "3",
    name: "Thank You Note",
    category: "Personal",
    content: "Dear [Name], I wanted to express my sincere gratitude for your help with...",
    starred: false,
    usageCount: 28,
  },
  {
    id: "4",
    name: "Introduction Email",
    category: "Networking",
    content: "Hi [Name], I hope this email finds you well. I'm reaching out because I came across your work on...",
    starred: false,
    usageCount: 19,
  },
  {
    id: "5",
    name: "Proposal Request",
    category: "Business",
    content: "Dear [Name], We are interested in exploring a potential partnership with your company...",
    starred: true,
    usageCount: 15,
  },
]

const categories = ["All", "Business", "Work", "Personal", "Networking"]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                Templates
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">Save and manage your email templates</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid - responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group border border-white/80 bg-background rounded-2xl shadow-sm transition-all-smooth hover:-translate-y-1 hover:shadow-large animate-fade-in"
              >
                <CardHeader className="pb-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <CardTitle className="text-sm sm:text-base truncate">{template.name}</CardTitle>
                      {template.starred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
                    </div>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {template.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">Used {template.usageCount} times</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{template.content}</p>
                  <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Copy className="w-3 h-3 mr-1" />
                      Use
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
