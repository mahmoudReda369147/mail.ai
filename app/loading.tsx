"use client"

import { Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden" aria-busy="true" aria-live="polite">
      {/* Subtle background gradient blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 grid min-h-screen place-items-center px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Premium loader emblem */}
          <div className="relative h-28 w-28">
            {/* Rotating conic gradient ring */}
            <div className="absolute inset-0 rounded-[24px] p-[2px] animate-spin-slow bg-[conic-gradient(var(--tw-gradient-stops))] from-primary via-accent to-primary">
              <div className="h-full w-full rounded-[22px] bg-background" />
            </div>

            {/* Core tile with glow */}
            <div className="absolute inset-[6px] rounded-2xl grid place-items-center bg-linear-to-br from-primary/10 to-accent/10 border border-border shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-transparent to-background/60" />
              <div className="absolute -inset-3 rounded-3xl bg-linear-to-r from-primary/20 to-accent/20 blur-2xl opacity-60 animate-pulse" />
              <Sparkles className="relative z-10 h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Loading text with animated dots */}
          <div className="text-center">
            <p className="text-foreground font-semibold text-lg tracking-tight">Loading your workspace<span className="sr-only">…</span></p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please wait a moment
              <span className="inline-flex w-10 justify-start ml-1 align-baseline">
                <span className="dot" />
                <span className="dot delay-150" />
                <span className="dot delay-300" />
              </span>
            </p>
          </div>

          {/* Indeterminate progress shimmer */}
          <div className="w-[280px] max-w-[70vw] h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-1/3 rounded-full bg-linear-to-r from-primary via-accent to-primary animate-indeterminate" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 2.4s linear infinite; }

        @keyframes dots-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .5; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .dot {
          width: 6px;
          height: 6px;
          margin-right: 6px;
          border-radius: 9999px;
          background: currentColor;
          color: hsl(var(--primary));
          display: inline-block;
          animation: dots-bounce 1.4s infinite ease-in-out both;
        }
        .dot.delay-150 { animation-delay: .15s; }
        .dot.delay-300 { animation-delay: .30s; }

        @keyframes indeterminate {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(30%); }
          100% { transform: translateX(120%); }
        }
        .animate-indeterminate {
          animation: indeterminate 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

