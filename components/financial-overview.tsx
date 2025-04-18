"use client"

import type React from "react"

import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinancialOverview() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Your monthly financial summary at a glance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FinancialCard
                title="Income"
                amount="$850.00"
                change="+2.5%"
                trend="up"
                icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
              />
              <FinancialCard
                title="Expenses"
                amount="$460.00"
                change="+4.1%"
                trend="up"
                icon={<TrendingDown className="h-4 w-4 text-red-500" />}
              />
              <FinancialCard
                title="Savings"
                amount="$390.00"
                change="+0.8%"
                trend="up"
                icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FinancialCard
                title="Income"
                amount="$4,250.00"
                change="+5.2%"
                trend="up"
                icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
              />
              <FinancialCard
                title="Expenses"
                amount="$2,840.00"
                change="-2.3%"
                trend="down"
                icon={<TrendingDown className="h-4 w-4 text-red-500" />}
              />
              <FinancialCard
                title="Savings"
                amount="$1,410.00"
                change="+12.5%"
                trend="up"
                icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FinancialCard
                title="Income"
                amount="$52,400.00"
                change="+8.7%"
                trend="up"
                icon={<DollarSign className="h-4 w-4 text-emerald-500" />}
              />
              <FinancialCard
                title="Expenses"
                amount="$35,200.00"
                change="+3.2%"
                trend="up"
                icon={<TrendingDown className="h-4 w-4 text-red-500" />}
              />
              <FinancialCard
                title="Savings"
                amount="$17,200.00"
                change="+15.1%"
                trend="up"
                icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface FinancialCardProps {
  title: string
  amount: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}

function FinancialCard({ title, amount, change, trend, icon }: FinancialCardProps) {
  return (
    <div className="rounded-lg border p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="rounded-full bg-muted p-1">{icon}</div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{amount}</p>
        <p className={`text-xs flex items-center gap-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change} from last period
        </p>
      </div>
    </div>
  )
}
