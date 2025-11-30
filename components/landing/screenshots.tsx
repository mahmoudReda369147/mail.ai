import { Sparkles, Zap, BarChart3, Mail } from "lucide-react"

export function Screenshots() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Product</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Beautiful, Intuitive
            <br />
            <span className="gradient-text">Dashboard Design</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Clean, modern interface designed for maximum productivity and ease of use
          </p>
        </div>

        {/* Main screenshot */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="absolute -inset-4 gradient-bg opacity-20 blur-3xl rounded-3xl" />
          <div className="relative rounded-2xl overflow-hidden border-2 border-border bg-card shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-accent/5" />
            <img
              src="/dashboard.png"
              alt="ReplyGenie Dashboard"
              className="w-full h-auto relative z-10"
            />
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Smart Inbox</h3>
            <p className="text-sm text-muted-foreground">
              Organized, prioritized emails at a glance
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-bold text-foreground mb-2">AI Assistance</h3>
            <p className="text-sm text-muted-foreground">
              Instant reply suggestions with one click
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">
              Respond faster with keyboard shortcuts
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Track time saved and productivity gains
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
