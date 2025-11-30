"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Sidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/top-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, User, Bell, Shield, Palette, Mail, CreditCard, LogOut } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Sidebar />
      <div className="lg:ms-72">
        <TopBar />
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                <Settings className="w-6 h-6 text-white" />
              </div>
              Settings
            </h1>
            <p className="text-lg text-muted-foreground">Manage your account preferences and integrations</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="border-2 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-6 sm:p-8 border-b border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <CardTitle className="text-xl font-bold">Profile Information</CardTitle>
                </div>
                <CardDescription className="text-base">Update your personal details and profile picture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      U
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" className="border-2 hover:border-primary/30 h-11 font-semibold bg-transparent mb-2">
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-semibold">Full Name</Label>
                    <Input id="name" defaultValue="User Account" className="h-12 border-2 border-border focus:border-primary rounded-xl text-base" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                    <Input id="email" type="email" defaultValue="user@email.com" className="h-12 border-2 border-border focus:border-primary rounded-xl text-base" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-base font-semibold">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="h-12 border-2 border-border focus:border-primary rounded-xl text-base" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="timezone" className="text-base font-semibold">Timezone</Label>
                    <Input id="timezone" defaultValue="UTC-5 (EST)" className="h-12 border-2 border-border focus:border-primary rounded-xl text-base" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button className="gradient-bg hover:opacity-90 h-12 shadow-md hover:shadow-glow transition-all duration-300 font-bold text-base px-8">
                    Save Changes
                  </Button>
                  <Button variant="outline" className="h-12 border-2 border-border hover:border-primary/30 font-semibold text-base bg-transparent">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Integration */}
            <Card className="border-2 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-6 sm:p-8 border-b border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-xl font-bold">Email Integration</CardTitle>
                </div>
                <CardDescription className="text-base">Connect and manage your email accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-2 border-border/50 rounded-2xl hover:border-green-500/30 transition-all bg-green-500/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <p className="font-bold text-base">Gmail</p>
                      <p className="text-sm text-muted-foreground">user@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-500/15 text-green-600 border-green-500/30 font-semibold px-3 py-1">
                      ✓ Connected
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-2 border-border/50 rounded-2xl hover:border-primary/30 transition-all border-dashed">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-7 h-7 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-bold text-base">Outlook</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-2 hover:border-primary/30 h-10 font-semibold bg-transparent">
                    Connect
                  </Button>
                </div>

                <Button variant="outline" className="w-full bg-transparent border-2 hover:border-primary/30 h-12 font-semibold text-base">
                  <Mail className="w-5 h-5 mr-2" />
                  Connect Another Account
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-2 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-6 sm:p-8 border-b border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-orange-500" />
                  </div>
                  <CardTitle className="text-xl font-bold">Notifications</CardTitle>
                </div>
                <CardDescription className="text-base">Choose how and when you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-6 p-4 rounded-xl hover:bg-muted/30 transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base mb-1">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between gap-6 p-4 rounded-xl hover:bg-muted/30 transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base mb-1">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between gap-6 p-4 rounded-xl hover:bg-muted/30 transition-all">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base mb-1">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Receive a summary of your activity every week</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card className="border-2 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-6 sm:p-8 border-b border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-pink-500" />
                  </div>
                  <CardTitle className="text-xl font-bold">Appearance</CardTitle>
                </div>
                <CardDescription className="text-base">Customize your interface theme</CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white border-2 border-primary hover:scale-105 transition-all shadow-md">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-white to-gray-100 border border-gray-200 flex items-center justify-center">
                      <span className="text-2xl">☀️</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Light</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-gray-900 border-2 border-transparent hover:border-primary/50 hover:scale-105 transition-all">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center">
                      <span className="text-2xl">🌙</span>
                    </div>
                    <span className="text-sm font-semibold text-white">Dark</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-5 rounded-xl bg-gradient-to-b from-white to-gray-900 border-2 border-transparent hover:border-primary/50 hover:scale-105 transition-all">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 via-gray-400 to-gray-800 flex items-center justify-center">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">Auto</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card className="border-2 border-border/50 bg-card/95 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-6 sm:p-8 border-b border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-500" />
                  </div>
                  <CardTitle className="text-xl font-bold">Subscription</CardTitle>
                </div>
                <CardDescription className="text-base">Manage your billing and subscription</CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-2 border-primary/30 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-bold text-xl text-primary">Pro Plan</p>
                      <Badge className="bg-primary text-white font-semibold">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">$19/month • Renews on Jan 20, 2025</p>
                    <p className="text-xs text-muted-foreground">Unlimited AI replies • Priority support</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-background border-2 hover:border-primary/30 h-11 font-semibold">
                      Upgrade
                    </Button>
                    <Button variant="outline" className="bg-background border-2 hover:border-primary/30 h-11 font-semibold">
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-2 border-destructive/50 bg-destructive/5 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl hover:border-destructive transition-all duration-300">
              <CardHeader className="p-6 sm:p-8 border-b border-destructive/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-destructive" />
                  </div>
                  <CardTitle className="text-xl font-bold text-destructive">Danger Zone</CardTitle>
                </div>
                <CardDescription className="text-base">Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-2 border-destructive/30 rounded-xl hover:border-destructive/50 transition-all">
                  <div>
                    <p className="font-bold text-base mb-1">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" className="w-full sm:w-auto h-11 font-bold shadow-md">
                    <LogOut className="w-5 h-5 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
