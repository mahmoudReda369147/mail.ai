"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/i18n/language-context"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ReplyGenie
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            {t("features")}
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            {t("pricing")}
          </Link>
          <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            {t("testimonials")}
          </Link>
        </div>

        {/* Desktop buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/auth">{t("login")}</Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-colors shadow-lg"
            asChild
          >
            <Link href="/auth">{t("getStarted")}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden bg-background border-b border-border p-4 space-y-4">
          <div className="flex flex-col gap-3">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("features")}
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("pricing")}
            </Link>
            <Link
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("testimonials")}
            </Link>
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Button variant="ghost" asChild className="w-full justify-center">
              <Link href="/auth">{t("login")}</Link>
            </Button>
            <Button className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90" asChild>
              <Link href="/auth">{t("getStarted")}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
