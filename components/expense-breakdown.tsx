"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ExpenseBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Your top spending categories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="font-medium">{category.name}</div>
              <div className="text-muted-foreground">${category.amount.toFixed(2)}</div>
            </div>
            <Progress value={category.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

const categories = [
  {
    name: "Housing",
    amount: 1200,
    percentage: 42,
  },
  {
    name: "Food & Dining",
    amount: 650,
    percentage: 23,
  },
  {
    name: "Transportation",
    amount: 350,
    percentage: 12,
  },
  {
    name: "Entertainment",
    amount: 250,
    percentage: 9,
  },
  {
    name: "Utilities",
    amount: 200,
    percentage: 7,
  },
  {
    name: "Other",
    amount: 190,
    percentage: 7,
  },
]
