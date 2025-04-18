"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Investment classification data
const investmentData = {
  byType: [
    { name: "Stocks", value: 45000, color: "#0ea5e9" },
    { name: "ETFs", value: 35000, color: "#8b5cf6" },
    { name: "Bonds", value: 25000, color: "#10b981" },
    { name: "Crypto", value: 20000, color: "#f59e0b" },
    { name: "SIPs", value: 15000, color: "#ec4899" },
    { name: "Cash", value: 2568.3, color: "#6b7280" },
  ],
  byRisk: [
    { name: "High Risk", value: 30000, color: "#ef4444" },
    { name: "Medium Risk", value: 70000, color: "#f59e0b" },
    { name: "Low Risk", value: 42568.3, color: "#10b981" },
  ],
  byRegion: [
    { name: "North America", value: 80000, color: "#0ea5e9" },
    { name: "Europe", value: 25000, color: "#8b5cf6" },
    { name: "Asia Pacific", value: 30000, color: "#10b981" },
    { name: "Emerging Markets", value: 7568.3, color: "#f59e0b" },
  ],
}

export default function InvestmentClassification() {
  const [activeTab, setActiveTab] = useState("byType")

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    const total = investmentData[activeTab as keyof typeof investmentData].reduce((sum, item) => sum + item.value, 0)
    return ((value / total) * 100).toFixed(1) + "%"
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-sm p-2 text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p>{formatCurrency(payload[0].value)}</p>
          <p>{formatPercentage(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Investment Classification</CardTitle>
        <CardDescription>Breakdown of your investment portfolio by different classifications</CardDescription>
        <Tabs defaultValue="byType" className="mt-2" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="byType">Asset Type</TabsTrigger>
            <TabsTrigger value="byRisk">Risk Level</TabsTrigger>
            <TabsTrigger value="byRegion">Region</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-medium text-lg">Allocation</h3>
            <div className="space-y-3">
              {investmentData[activeTab as keyof typeof investmentData].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-sm font-medium">{formatPercentage(item.value)}</div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="h-2 bg-muted rounded-full w-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: formatPercentage(item.value),
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                    <div className="ml-2 text-muted-foreground min-w-[80px] text-right">
                      {formatCurrency(item.value)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 h-[300px]">
            <ChartContainer className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentData[activeTab as keyof typeof investmentData]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {investmentData[activeTab as keyof typeof investmentData].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
