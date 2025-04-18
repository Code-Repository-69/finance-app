"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Simulated real-time data generator
const generateRandomData = (baseValue: number, volatility: number) => {
  return baseValue + (Math.random() - 0.5) * volatility
}

export default function RealTimeInvestmentChart() {
  const [data, setData] = useState<Array<{ time: string; value: number }>>([])
  const [timeframe, setTimeframe] = useState("1D")

  // Initialize with some historical data
  useEffect(() => {
    const initialData = []
    const now = new Date()
    const baseValue = 142500

    // Generate data points based on timeframe
    if (timeframe === "1D") {
      for (let i = 0; i < 24; i++) {
        const hour = new Date(now)
        hour.setHours(hour.getHours() - 23 + i)
        initialData.push({
          time: hour.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          value: baseValue + (Math.random() - 0.5) * 2000 * (i / 12),
        })
      }
    } else if (timeframe === "1W") {
      for (let i = 0; i < 7; i++) {
        const day = new Date(now)
        day.setDate(day.getDate() - 6 + i)
        initialData.push({
          time: day.toLocaleDateString([], { month: "short", day: "numeric" }),
          value: baseValue + (Math.random() - 0.5) * 5000 * (i / 3),
        })
      }
    } else if (timeframe === "1M") {
      for (let i = 0; i < 30; i++) {
        const day = new Date(now)
        day.setDate(day.getDate() - 29 + i)
        initialData.push({
          time: day.toLocaleDateString([], { month: "short", day: "numeric" }),
          value: baseValue + (Math.random() - 0.5) * 10000 * (i / 15),
        })
      }
    } else if (timeframe === "1Y") {
      for (let i = 0; i < 12; i++) {
        const month = new Date(now)
        month.setMonth(month.getMonth() - 11 + i)
        initialData.push({
          time: month.toLocaleDateString([], { month: "short" }),
          value: baseValue + (Math.random() - 0.5) * 20000 * (i / 6),
        })
      }
    }

    setData(initialData)
  }, [timeframe])

  // Simulate real-time updates
  useEffect(() => {
    if (timeframe !== "1D") return

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData]
        if (newData.length > 0) {
          const lastValue = newData[newData.length - 1].value
          const now = new Date()
          newData.push({
            time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            value: generateRandomData(lastValue, 500),
          })

          // Keep only the last 24 data points for 1D view
          if (newData.length > 24) {
            newData.shift()
          }
        }
        return newData
      })
    }, 60000) // Update every minute for real-time effect

    return () => clearInterval(interval)
  }, [timeframe])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Calculate change
  const calculateChange = () => {
    if (data.length < 2) return { value: 0, percentage: 0 }

    const firstValue = data[0].value
    const lastValue = data[data.length - 1].value
    const change = lastValue - firstValue
    const percentage = (change / firstValue) * 100

    return {
      value: change,
      percentage: percentage,
    }
  }

  const change = calculateChange()
  const isPositive = change.value >= 0

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Real-time investment portfolio value</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="1D" onValueChange={setTimeframe}>
              <TabsList>
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <div className="text-3xl font-bold">
              {data.length > 0 ? formatCurrency(data[data.length - 1].value) : "$0.00"}
            </div>
            <div className={`flex items-center gap-1 ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
              <span>{isPositive ? "↑" : "↓"}</span>
              <span>{formatCurrency(Math.abs(change.value))}</span>
              <span>({change.percentage.toFixed(2)}%)</span>
              <span className="text-muted-foreground text-xs">{timeframe}</span>
            </div>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="stocks">Stocks Only</SelectItem>
              <SelectItem value="crypto">Crypto Only</SelectItem>
              <SelectItem value="etfs">ETFs Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ChartContainer
          config={{
            value: {
              label: "Portfolio Value",
              color: isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} minTickGap={10} />
              <YAxis
                domain={["dataMin - 5000", "dataMax + 5000"]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
