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
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <TopBar />
        <div className="p-4 sm:p-6 max-w-4xl">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              Settings
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <User className="w-5 h-5" />
                  Profile
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xl font-semibold">
                    U
                  </div>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="User Account" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="user@email.com" />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 w-full sm:w-auto">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Email Integration */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Mail className="w-5 h-5" />
                  Email Integration
                </CardTitle>
                <CardDescription>Connect your email accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Gmail</p>
                      <p className="text-sm text-muted-foreground">user@gmail.com</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 w-fit">Connected</Badge>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Connect Another Account
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base">Email Notifications</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base">Push Notifications</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base">Weekly Digest</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Get a weekly summary of your activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex gap-3">
                  <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white border-2 border-primary flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-900">Light</span>
                  </button>
                  <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-900 border-2 border-transparent flex items-center justify-center">
                    <span className="text-xs font-medium text-white">Dark</span>
                  </button>
                  <button className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-b from-white to-gray-900 border-2 border-transparent flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-500">Auto</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CreditCard className="w-5 h-5" />
                  Subscription
                </CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-accent/5">
                  <div>
                    <p className="font-semibold text-primary">Pro Plan</p>
                    <p className="text-sm text-muted-foreground">$19/month • Renews on Jan 20, 2025</p>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-destructive text-base sm:text-lg">
                  <Shield className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 pt-0 sm:pt-0">
                <div>
                  <p className="font-medium text-sm sm:text-base">Delete Account</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <LogOut className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
