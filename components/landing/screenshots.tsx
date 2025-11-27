export function Screenshots() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Beautiful Interface</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Clean, modern dashboard designed for productivity
        </p>

        <div className="relative max-w-5xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden border border-border"
            style={{ boxShadow: "var(--shadow-large)" }}
          >
            <img src="/dashboard.png" alt="ReplyGenie Dashboard" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
