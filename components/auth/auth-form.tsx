"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-10 group">
          <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">ReplyGenie</span>
        </Link>
        <h1 className="text-4xl font-bold text-foreground mb-3 mt-10">Welcome back</h1>
        <p className="text-lg text-muted-foreground">Sign in to your account to continue</p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1">
          <TabsTrigger value="login" className="text-base">Log In</TabsTrigger>
          <TabsTrigger value="signup" className="text-base">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-border hover:bg-muted hover:border-primary/30 transition-all-smooth bg-transparent text-base"
            >
              <Mail className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground font-medium">Or continue with email</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-base">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className="h-12 border-border focus:border-primary text-base"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-base">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline font-medium">
                  Forgot?
                </Link>
              </div>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                className="h-12 border-border focus:border-primary text-base"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 gradient-bg text-white hover:opacity-90 transition-all-smooth text-base font-semibold shadow-md hover:shadow-glow group"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-border hover:bg-muted hover:border-primary/30 transition-all-smooth bg-transparent text-base"
            >
              <Mail className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground font-medium">Or continue with email</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-name" className="text-base">Full Name</Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                className="h-12 border-border focus:border-primary text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-base">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                className="h-12 border-border focus:border-primary text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-base">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                className="h-12 border-border focus:border-primary text-base"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 gradient-bg text-white hover:opacity-90 transition-all-smooth text-base font-semibold shadow-md hover:shadow-glow group"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-primary hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
