import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out ReplyGenie",
    features: ["50 AI replies per month", "Basic email integration", "3 tone options", "Email support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "Best for professionals",
    features: [
      "Unlimited AI replies",
      "Priority email integration",
      "All tone options",
      "Custom templates",
      "Priority support",
      "Advanced analytics",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$49",
    description: "For teams and businesses",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "API access",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">Choose the plan that works best for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative bg-card transition-all-smooth ${
                plan.highlighted ? "scale-105 border-primary shadow-glow" : "border-border hover:shadow-large"
              }`}
              style={{ boxShadow: plan.highlighted ? undefined : "var(--shadow-medium)" }}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-white border-0">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full transition-all-smooth ${
                    plan.highlighted
                      ? "gradient-bg text-white hover:opacity-90"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                  asChild
                >
                  <Link href="/auth">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
