"use client"

import { BarChart3, PieChart, Settings, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Expenses",
      href: "/expenses",
      icon: Wallet,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: PieChart,
    },
    {
      name: "Budget",
      href: "/budget",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar className="hidden md:flex border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xl font-bold">BUDGET</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">budget v1.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
