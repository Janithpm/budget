"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const pieData = [
  { name: "Food", value: 350, color: "#f97316" },
  { name: "Housing", value: 1200, color: "#3b82f6" },
  { name: "Transportation", value: 250, color: "#10b981" },
  { name: "Entertainment", value: 120, color: "#8b5cf6" },
  { name: "Shopping", value: 200, color: "#ec4899" },
]

const barData = [
  { name: "Jan", amount: 1800 },
  { name: "Feb", amount: 1600 },
  { name: "Mar", amount: 1900 },
  { name: "Apr", amount: 1700 },
  { name: "May", amount: 2100 },
]

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Tabs defaultValue="spending">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Spending by Category</CardTitle>
              <CardDescription>Your spending distribution this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,120</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Housing</div>
                <p className="text-xs text-muted-foreground">$1,200 (56%)</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Spending</CardTitle>
              <CardDescription>Your spending over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>Your spending decreased by 5% in February</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  <span>May had the highest spending this year</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  <span>Housing is consistently your largest expense</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
