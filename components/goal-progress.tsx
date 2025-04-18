"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function GoalProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
        <CardDescription>Track your progress towards your goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">{goal.name}</div>
              <div className="text-muted-foreground">
                ${goal.current.toFixed(0)} of ${goal.target.toFixed(0)}
              </div>
            </div>
            <Progress value={(goal.current / goal.target) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {goal.timeframe} - {Math.round((goal.current / goal.target) * 100)}% complete
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

const goals = [
  {
    name: "Emergency Fund",
    current: 8500,
    target: 10000,
    timeframe: "3 months left",
  },
  {
    name: "Down Payment",
    current: 35000,
    target: 60000,
    timeframe: "1 year left",
  },
  {
    name: "Vacation",
    current: 1200,
    target: 3000,
    timeframe: "6 months left",
  },
]
