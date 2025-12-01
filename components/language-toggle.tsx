"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 px-2"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
    >
      <Languages className="w-4 h-4" />
      <span 
        className={`text-xs font-medium ${
          language === "ar" ? 'arabic-text' : ''
        }`}
        dir={language === "ar" ? "rtl" : "ltr"}
        lang={language === "ar" ? "ar" : "en"}
      >
        {language === "en" ? "AR" : "EN"}
      </span>
    </Button>
  )
}
