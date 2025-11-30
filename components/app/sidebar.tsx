"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Inbox, Zap, FileText, Clock, Settings, MessageCircle, Menu, X, LogOut, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { Badge } from "@/components/ui/badge"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const menuItems = [
    { icon: Inbox, label: t("inbox"), href: "/inbox", badge: "12" },
    { icon: Zap, label: t("smartReplies"), href: "/smart-replies" },
    { icon: FileText, label: t("templates"), href: "/templates" },
    { icon: Clock, label: t("history"), href: "/history" },
    { icon: MessageCircle, label: t("chats"), href: "/chats", badge: "3" },
    { icon: Settings, label: t("settings"), href: "/settings" },
  ]

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 start-4 z-50 lg:hidden bg-card hover:bg-muted shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-72 h-screen bg-card/95 backdrop-blur-xl border-e border-border/50 flex flex-col fixed start-0 top-0 z-40 transition-all duration-300 shadow-xl",
          "lg:translate-x-0",
          isOpen ? "translate-x-0 rtl:-translate-x-0" : "-translate-x-full rtl:translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ReplyGenie</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group relative",
                    isActive
                      ? "bg-gradient-to-r from-primary/15 to-accent/15 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                    isActive ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge className={cn(
                      "h-6 px-2 text-xs font-semibold",
                      isActive ? "bg-primary text-white" : "bg-muted-foreground/20 text-foreground"
                    )}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all duration-200 cursor-pointer group">
            <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-white font-bold shadow-md text-base">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{t("userAccount")}</p>
              <p className="text-xs text-muted-foreground truncate">user@email.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
      </aside>
    </>
  )
}
