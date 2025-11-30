"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/i18n/language-context"

// Helper function to get server URL
const getServerUrl = () => {
  return process.env.NEXT_PUBLIC_SERVER_URL  || ''
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [auth, setAuth] = useState<{ token: string | null; name: string | null; email: string | null }>({
    token: null,
    name: null,
    email: null,
  })
  const { t } = useLanguage()
  const router = useRouter()

  const handleLoginClick = () => {
    window.location.href = getServerUrl() + "/auth/login"
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      const name = localStorage.getItem("name")
      const email = localStorage.getItem("email")
      if (token) {
        setAuth({ token, name, email })
      }
    } catch (err) {
      console.error("Failed to read auth from localStorage", err)
    }
  }, [])

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const status = params.get("status")
      const token = params.get("token")
      const email = params.get("email")
      const name = params.get("name")
      console.log("Auth params:", { status, token })
      if (status === "success" && token) {
        localStorage.setItem("token", token)
        if (email) localStorage.setItem("email", email)
        if (name) localStorage.setItem("name", name)
        setAuth({ token, name: name || null, email: email || null })
        router.replace("/inbox")
      }
    } catch (err) {
      console.error("Failed to read auth params from URL", err)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-background/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">ReplyGenie</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="#features"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            {t("features")}
          </Link>
          <Link
            href="#pricing"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            {t("pricing")}
          </Link>
          <Link
            href="#testimonials"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            {t("testimonials")}
          </Link>
        </div>

        {/* Desktop buttons / User avatar */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          {auth.token ? (
            <div className="relative">
              <button
                aria-label="User menu"
                className="w-9 h-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center border border-border hover:bg-primary/20 transition"
                onClick={() => setIsUserMenuOpen((v) => !v)}
              >
                {(auth.name || auth.email || "U").charAt(0).toUpperCase()}
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-lg border border-border bg-background shadow-lg p-3 z-50">
                  <p className="text-sm font-semibold text-foreground truncate">{auth.name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{auth.email || "No email"}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" className="text-sm font-medium" onClick={handleLoginClick}>
                {t("login")}
              </Button>
              <Button className="gradient-bg text-white hover:opacity-90 shadow-md hover:shadow-glow transition-all duration-300 group" onClick={handleLoginClick}>
                {t("getStarted")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-200 ${
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-200 ${
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
          </Button>
        </div>
      </nav>

      {/* Mobile menu dropdown with animation */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-lg border-b border-border p-4 space-y-4">
          <div className="flex flex-col gap-2">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 py-3 px-4 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("features")}
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 py-3 px-4 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("pricing")}
            </Link>
            <Link
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 py-3 px-4 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("testimonials")}
            </Link>
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            {auth.token ? (
              <div className="p-3 rounded-lg border border-border bg-card/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center border border-border">
                    {(auth.name || auth.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{auth.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{auth.email || "No email"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" className="w-full justify-center" onClick={handleLoginClick}>
                  {t("login")}
                </Button>
                <Button className="w-full gradient-bg text-white hover:opacity-90 shadow-md" onClick={handleLoginClick}>
                  {t("getStarted")}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

