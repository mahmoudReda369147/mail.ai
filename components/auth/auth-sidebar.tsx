import { Sparkles, CheckCircle2, Star, Zap } from "lucide-react"

export function AuthSidebar() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-linear-to-br from-primary/5 via-background to-accent/5 h-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-md text-center relative z-10">
        <div className="w-24 h-24 gradient-bg rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-float">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          AI-Powered Email Assistant
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          Join thousands of professionals who save hours every week with intelligent AI replies
        </p>

        {/* Features list */}
        <div className="space-y-4 text-left mb-12">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Save 5+ Hours Weekly</p>
              <p className="text-sm text-muted-foreground">Generate professional replies in seconds</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-semibold text-foreground">4.9/5 Rating</p>
              <p className="text-sm text-muted-foreground">Loved by 50,000+ professionals</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Setup in 2 Minutes</p>
              <p className="text-sm text-muted-foreground">No credit card required to start</p>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Trusted by teams at</p>
          <div className="flex items-center justify-center gap-6 opacity-60">
            <span className="text-lg font-bold text-foreground">Google</span>
            <span className="text-lg font-bold text-foreground">Microsoft</span>
            <span className="text-lg font-bold text-foreground">Amazon</span>
          </div>
        </div>
      </div>
    </div>
  )
}
