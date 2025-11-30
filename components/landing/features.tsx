import { Sparkles, Mail, Zap, Brain, Globe, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "AI Reply Suggestions",
    description: "Get intelligent, context-aware reply suggestions powered by advanced AI that understands your communication style.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Universal Integration",
    description: "Seamlessly works with Gmail, Outlook, and other major email platforms. No complex setup required.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate professional replies in seconds. Save hours every week and never miss an important email.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description: "Our AI learns from your writing patterns to generate replies that sound authentically like you.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Globe,
    title: "Multiple Languages",
    description: "Support for 50+ languages. Write emails in any language with perfect grammar and tone.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your emails are encrypted and never stored. We prioritize your privacy and data security above all.",
    color: "from-violet-500 to-purple-500",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Everything You Need to
            <br />
            <span className="gradient-text">Master Your Inbox</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful AI features designed to make email management effortless and efficient
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group bg-card border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden relative"
              style={{
                boxShadow: "var(--shadow-medium)",
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardContent className="pt-8 pb-8 px-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-card border border-border">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground mb-2">50K+</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground mb-2">2M+</p>
            <p className="text-sm text-muted-foreground">Emails Generated</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground mb-2">4.9/5</p>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground mb-2">5hrs</p>
            <p className="text-sm text-muted-foreground">Avg. Time Saved</p>
          </div>
        </div>
      </div>
    </section>
  )
}
