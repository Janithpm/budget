"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

type Budget = {
  id: number
  category: string
  amount: number
  spent: number
}

const initialBudgets: Budget[] = [
  {
    id: 1,
    category: "Food",
    amount: 500,
    spent: 350,
  },
  {
    id: 2,
    category: "Housing",
    amount: 1500,
    spent: 1200,
  },
  {
    id: 3,
    category: "Transportation",
    amount: 300,
    spent: 250,
  },
  {
    id: 4,
    category: "Entertainment",
    amount: 200,
    spent: 120,
  },
]

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [open, setOpen] = useState(false)
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
  })
  const isMobile = useIsMobile()

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      return
    }

    const budget: Budget = {
      id: budgets.length + 1,
      category: newBudget.category,
      amount: Number.parseFloat(newBudget.amount),
      spent: 0,
    }

    setBudgets([...budgets, budget])
    setNewBudget({ category: "", amount: "" })
    setOpen(false)
  }

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const percentSpent = (totalSpent / totalBudget) * 100

  // Form content shared between Dialog and Drawer
  const FormContent = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="budget-category">Category</Label>
        <Select value={newBudget.category} onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}>
          <SelectTrigger id="budget-category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Housing">Housing</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem>
            <SelectItem value="Utilities">Utilities</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="budget-amount">Amount</Label>
        <Input
          id="budget-amount"
          type="number"
          placeholder="0.00"
          value={newBudget.amount}
          onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
        />
      </div>
    </div>
  )

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budget</h1>

        {isMobile ? (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button size="sm" className="rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add New Budget</DrawerTitle>
                <DrawerDescription>Set a budget for a specific category.</DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <FormContent />
              </div>
              <DrawerFooter>
                <Button onClick={handleAddBudget}>Save Budget</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Budget</DialogTitle>
                <DialogDescription>Set a budget for a specific category.</DialogDescription>
              </DialogHeader>
              <FormContent />
              <DialogFooter>
                <Button onClick={handleAddBudget}>Save Budget</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-4">
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Budget</span>
                <span className="font-medium">${totalBudget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-medium">${totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium">${(totalBudget - totalSpent).toFixed(2)}</span>
              </div>
              <Progress value={percentSpent} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 mt-4 md:mt-0 md:col-span-3">
          <h2 className="text-lg font-semibold">Category Budgets</h2>
          <div className="md:grid md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
            {budgets.map((budget) => {
              const percentUsed = (budget.spent / budget.amount) * 100
              let statusColor = "bg-green-500"

              if (percentUsed > 90) {
                statusColor = "bg-red-500"
              } else if (percentUsed > 75) {
                statusColor = "bg-yellow-500"
              }

              return (
                <Card key={budget.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
                          <span className="font-medium">{budget.category}</span>
                        </div>
                        <div className="text-sm">
                          ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                        </div>
                      </div>
                      <Progress value={percentUsed} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
