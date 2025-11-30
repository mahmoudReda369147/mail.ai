import { Check, Sparkles, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "Forever Free",
    description: "Perfect for trying out ReplyGenie",
    features: ["50 AI replies per month", "Basic email integration", "3 tone options", "Community support", "Email templates"],
    highlighted: false,
    icon: Sparkles,
    iconColor: "text-blue-500",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Best for professionals and power users",
    features: [
      "Unlimited AI replies",
      "All email integrations",
      "Advanced tone customization",
      "Custom templates library",
      "Priority support",
      "Advanced analytics dashboard",
      "Multi-language support",
      "Browser extensions",
    ],
    highlighted: true,
    icon: Star,
    iconColor: "text-yellow-500",
    badge: "Most Popular",
  },
  {
    name: "Business",
    price: "$49",
    period: "per month",
    description: "For teams and growing businesses",
    features: [
      "Everything in Pro",
      "Team collaboration tools",
      "Unlimited team members",
      "API access & webhooks",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee (99.9%)",
      "Advanced security features",
    ],
    highlighted: false,
    icon: TrendingUp,
    iconColor: "text-purple-500",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Pricing</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
            <br />
            <span className="gradient-text">No Hidden Fees</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative bg-card transition-all duration-300 ${
                plan.highlighted
                  ? "lg:scale-110 border-2 border-primary shadow-2xl z-10"
                  : "border-border hover:border-primary/30 hover:shadow-xl"
              }`}
              style={{
                boxShadow: plan.highlighted ? "var(--shadow-xl)" : "var(--shadow-medium)",
              }}
            >
              {plan.badge && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <Badge className="gradient-bg text-white border-0 px-4 py-1 text-sm font-semibold shadow-lg">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.highlighted ? "gradient-bg" : "bg-muted"
                }`}>
                  <plan.icon className={`w-8 h-8 ${plan.highlighted ? "text-white" : plan.iconColor}`} />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">{plan.name}</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{plan.period}</p>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0 pb-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.highlighted ? "bg-primary/20" : "bg-muted"
                      }`}>
                        <Check className={`w-3.5 h-3.5 ${plan.highlighted ? "text-primary" : "text-foreground"}`} />
                      </div>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className={`w-full transition-all-smooth ${
                    plan.highlighted
                      ? "gradient-bg text-white hover:opacity-90 shadow-glow-hover text-lg py-6"
                      : "bg-secondary text-secondary-foreground hover:bg-muted border border-border text-lg py-6"
                  }`}
                  asChild
                >
                  <Link href="/auth">
                    {plan.highlighted ? "Get Started Now" : "Get Started"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by professionals worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-foreground">Google</div>
            <div className="text-2xl font-bold text-foreground">Microsoft</div>
            <div className="text-2xl font-bold text-foreground">Amazon</div>
            <div className="text-2xl font-bold text-foreground">Apple</div>
          </div>
        </div>
      </div>
    </section>
  )
}
