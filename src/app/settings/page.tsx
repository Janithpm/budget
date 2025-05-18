"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BellRing, CreditCard, LogOut, Moon, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Account</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john.doe@example.com" />
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Currency & Region</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="budget-alerts" className="flex-1">
                Budget alerts
                <p className="text-sm font-normal text-muted-foreground">
                  Get notified when you&apos;re close to your budget limit
                </p>
              </Label>
              <Switch id="budget-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-summary" className="flex-1">
                Weekly summary
                <p className="text-sm font-normal text-muted-foreground">Receive a weekly summary of your spending</p>
              </Label>
              <Switch id="weekly-summary" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="tips" className="flex-1">
                Saving tips
                <p className="text-sm font-normal text-muted-foreground">
                  Get personalized tips to help you save money
                </p>
              </Label>
              <Switch id="tips" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex-1">
                Dark mode
                <p className="text-sm font-normal text-muted-foreground">Toggle between light and dark mode</p>
              </Label>
              <Switch id="dark-mode" />
            </div>
          </CardContent>
        </Card>

        <Button variant="destructive" className="w-full md:col-span-2">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
