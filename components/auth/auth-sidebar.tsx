import { Sparkles } from "lucide-react"

export function AuthSidebar() {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center p-12 max-w- bg-gradient-to-br from-muted to-background h-full">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 gradient-bg rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">AI-Powered Email Assistant</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Join thousands of professionals who save hours every week with ReplyGenie
        </p>
      </div>
    </div>
  )
}
