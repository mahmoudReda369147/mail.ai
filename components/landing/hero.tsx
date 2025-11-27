import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in text-balance">
          Write better emails in seconds <span className="gradient-text">using AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in text-pretty">
          ReplyGenie analyzes any email and generates professional replies instantly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
          <Button size="lg" className="px-8" asChild>
            <Link href="/auth">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-muted transition-all-smooth px-8 bg-transparent"
            asChild
          >
            <Link href="/inbox">Try Demo</Link>
          </Button>
        </div>

        <div className="relative max-w-5xl mx-auto animate-fade-in">
          <div className="absolute inset-0 gradient-bg opacity-20 blur-3xl rounded-full transform scale-75" />
          <div className="relative rounded-2xl overflow-hidden shadow-large border border-border">
            <img src="/home-page.png" alt="ReplyGenie Dashboard Preview" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
