"use client"

import { Search, Bell, Command } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/i18n/language-context"
import { Badge } from "@/components/ui/badge"

export function TopBar() {
  const { t } = useLanguage()

  return (
    <header className="h-20 bg-card/50 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="relative flex-1 max-w-2xl ps-10 lg:ps-0">
        <div className="relative group">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder={t("searchEmails")}
            className="ps-12 pe-20 h-12 bg-muted/50 border-2 border-transparent hover:border-primary/20 focus:border-primary focus:bg-background focus:ring-0 w-full rounded-xl text-base transition-all duration-200"
          />
          <div className="absolute end-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-muted-foreground/10">
            <Command className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageToggle />
        <ThemeToggle />
        <button className="relative w-11 h-11 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 group">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -end-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-white text-xs font-bold group-hover:scale-110 transition-transform">
            3
          </Badge>
        </button>
        <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-white font-bold shadow-md hover:shadow-glow transition-all duration-300 cursor-pointer hover:scale-105">
          U
        </div>
      </div>
    </header>
  )
}
