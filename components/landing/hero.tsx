import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-bg-subtle border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Email Assistant</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in leading-tight">
            Write Better Emails
            <br />
            <span className="gradient-text">10x Faster</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in leading-relaxed">
            ReplyGenie uses advanced AI to analyze emails and generate professional, context-aware replies in seconds. Save hours every week.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in">
            <Button size="lg" className="px-8 py-6 text-lg gradient-bg hover:opacity-90 shadow-glow-hover group" asChild>
              <Link href="/auth">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-2 hover:bg-muted transition-all-smooth bg-background"
              asChild
            >
              <Link href="/inbox">View Demo</Link>
            </Button>
          </div>
        </div>

        {/* Hero image/screenshot */}
        <div className="relative max-w-6xl mx-auto animate-fade-in">
          <div className="absolute -inset-4 gradient-bg opacity-20 blur-3xl rounded-3xl" />
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10" />
            <img
              src="/home-page.png"
              alt="ReplyGenie Dashboard Preview"
              className="w-full h-auto relative z-10"
            />
          </div>

          {/* Floating elements */}
          <div className="absolute -top-8 -left-8 p-4 rounded-xl bg-card border border-border shadow-large animate-float hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">AI Generated</p>
                <p className="text-xs text-muted-foreground">Reply ready</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-card border border-border shadow-large animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">2.5hrs</p>
              <p className="text-xs text-muted-foreground">Saved this week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
