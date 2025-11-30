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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Sidebar />
      <div className="lg:ms-72">
        <TopBar />
        <div className="p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Templates
              </h1>
              <p className="text-lg text-muted-foreground">Save and manage your email templates for quick replies</p>
            </div>
            <Button className="gradient-bg hover:opacity-90 w-full sm:w-auto h-12 shadow-md hover:shadow-glow transition-all duration-300 font-bold text-base">
              <Plus className="w-5 h-5 mr-2" />
              New Template
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-5 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search templates by name or content..."
                className="pl-12 h-12 border-2 border-border focus:border-primary rounded-xl text-base bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 border-2 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : "bg-background border-border text-muted-foreground hover:bg-muted hover:border-primary/30"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid - responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="group border-2 border-border/50 hover:border-primary/30 bg-card/95 backdrop-blur-xl rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
              >
                <CardHeader className="pb-4 p-6 border-b border-border/50">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <CardTitle className="text-lg truncate font-bold">{template.name}</CardTitle>
                      {template.starred && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 shrink-0" />}
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0 font-semibold px-3 py-1">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CardDescription className="font-medium">
                      Used {template.usageCount} times
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground line-clamp-4 mb-6 leading-relaxed">{template.content}</p>
                  <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent border-2 hover:border-primary/30 h-10 font-semibold">
                      <Copy className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 h-10 w-10 p-0">
                      <Trash2 className="w-4 h-4" />
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
