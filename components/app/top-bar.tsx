"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/i18n/language-context"

export function TopBar() {
  const { t } = useLanguage()

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6">
      <div className="relative flex-1 max-w-md ps-10 lg:ps-0">
        <Search className="absolute start-3 lg:start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("searchEmails")}
          className="ps-10 bg-muted border-0 focus:bg-background focus:ring-2 focus:ring-primary/20 w-full"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold">
          U
        </div>
      </div>
    </header>
  )
}
