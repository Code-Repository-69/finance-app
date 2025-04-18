"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InvestmentSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
        <CardDescription>Your investment overview and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-lg mb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">Total Portfolio Value</p>
              <p className="text-2xl font-bold">$142,568.30</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Total Return</p>
              <p className="text-lg font-semibold text-emerald-500">+12.4%</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Your Assets</h3>
          {investments.map((investment) => (
            <div key={investment.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">{investment.symbol}</div>
                <div>
                  <p className="font-medium text-sm">{investment.name}</p>
                  <p className="text-xs text-muted-foreground">{investment.shares} shares</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${investment.value.toFixed(2)}</p>
                <p className={`text-xs ${investment.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {investment.change >= 0 ? "+" : ""}
                  {investment.change}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="w-full mt-4 flex items-center justify-center gap-1">
          View All Investments
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

const investments = [
  {
    name: "S&P 500 ETF",
    symbol: "VOO",
    shares: 28,
    value: 12468.4,
    change: 1.2,
  },
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    shares: 15,
    value: 2814.75,
    change: 0.8,
  },
  {
    name: "Microsoft",
    symbol: "MSFT",
    shares: 12,
    value: 4210.2,
    change: -0.5,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    shares: 0.25,
    value: 7125.3,
    change: 4.7,
  },
]
