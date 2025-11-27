import { Sparkles, Mail, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "AI Reply Suggestions",
    description: "Get intelligent reply suggestions tailored to the context of each email you receive.",
  },
  {
    icon: Mail,
    title: "Gmail & Outlook Integration",
    description: "Seamlessly connect with your existing email accounts. Works with Gmail and Outlook.",
  },
  {
    icon: Zap,
    title: "Multiple Tones",
    description: "Choose from Professional, Friendly, or Short tones to match your communication style.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your emails efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-card border-border hover:shadow-large hover:-translate-y-1 transition-all-smooth cursor-default"
              style={{ boxShadow: "var(--shadow-medium)" }}
            >
              <CardContent className="pt-8 pb-8 px-6">
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 shadow-glow">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
