"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coffee, Home, Plus, ShoppingBag, Utensils } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

type Expense = {
  id: number
  amount: number
  category: string
  description: string
  date: string
}

const initialExpenses: Expense[] = [
  {
    id: 1,
    amount: 42.5,
    category: "food",
    description: "Grocery shopping",
    date: "2025-05-18",
  },
  {
    id: 2,
    amount: 12.99,
    category: "coffee",
    description: "Coffee shop",
    date: "2025-05-17",
  },
  {
    id: 3,
    amount: 35.0,
    category: "shopping",
    description: "New t-shirt",
    date: "2025-05-16",
  },
  {
    id: 4,
    amount: 1200.0,
    category: "housing",
    description: "Rent payment",
    date: "2025-05-15",
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  food: <Utensils className="h-4 w-4" />,
  coffee: <Coffee className="h-4 w-4" />,
  shopping: <ShoppingBag className="h-4 w-4" />,
  housing: <Home className="h-4 w-4" />,
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [open, setOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
  })
  const isMobile = useIsMobile()

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.category || !newExpense.description) {
      return
    }

    const expense: Expense = {
      id: expenses.length + 1,
      amount: Number.parseFloat(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description,
      date: new Date().toISOString().split("T")[0],
    }

    setExpenses([expense, ...expenses])
    setNewExpense({ amount: "", category: "", description: "" })
    setOpen(false)
  }

  // Form content shared between Dialog and Drawer
  const FormContent = () => (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={newExpense.category}
          onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="coffee">Coffee</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="housing">Housing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="What was this expense for?"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
      </div>
    </div>
  )

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>

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
                <DrawerTitle>Add New Expense</DrawerTitle>
                <DrawerDescription>Enter the details of your expense below.</DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <FormContent />
              </div>
              <DrawerFooter>
                <Button onClick={handleAddExpense}>Save Expense</Button>
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
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Enter the details of your expense below.</DialogDescription>
              </DialogHeader>
              <FormContent />
              <DialogFooter>
                <Button onClick={handleAddExpense}>Save Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        {expenses.map((expense) => (
          <Card key={expense.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    {categoryIcons[expense.category] || <ShoppingBag className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
                <p className="font-semibold">${expense.amount.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
