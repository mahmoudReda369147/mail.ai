import { Star, Quote, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    avatar: "SJ",
    content: "ReplyGenie has completely transformed how I handle emails. What used to take me 2 hours now takes 20 minutes. The AI understands context perfectly and generates replies that sound natural.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Sales Director at Growth Inc",
    avatar: "MC",
    content: "The multiple tone options are brilliant. I can switch between professional for clients and friendly for team members instantly. It's saved me countless hours every week.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Consultant",
    avatar: "ER",
    content: "Best investment I've made for my business. The AI learns my writing style and generates replies that genuinely sound like me. My clients can't tell the difference!",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Customer Success Lead",
    avatar: "DK",
    content: "I was skeptical at first, but ReplyGenie exceeded all expectations. The quality of AI-generated responses is outstanding, and it integrates seamlessly with my workflow.",
    rating: 5,
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Director",
    avatar: "LA",
    content: "Managing 100+ emails daily was overwhelming until I found ReplyGenie. Now I breeze through my inbox with confidence. It's like having a personal assistant!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Startup Founder",
    avatar: "JW",
    content: "As a busy founder, every minute counts. ReplyGenie helps me stay on top of communications without sacrificing quality. It's an essential tool for any entrepreneur.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Testimonials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Loved by Thousands of
            <br />
            <span className="gradient-text">Happy Users</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join professionals who save hours every week with ReplyGenie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="group bg-card border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              style={{
                boxShadow: "var(--shadow-medium)",
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              <CardContent className="pt-8 pb-8 px-6 relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed text-[15px]">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold shadow-md text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-20 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full gradient-bg border-2 border-background" />
                <div className="w-10 h-10 rounded-full bg-accent border-2 border-background" />
                <div className="w-10 h-10 rounded-full bg-primary border-2 border-background" />
              </div>
              <p className="text-sm font-medium text-foreground">
                <span className="text-primary font-bold">50,000+</span> professionals trust ReplyGenie
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm font-semibold text-foreground">4.9/5 average rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
