"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from "lucide-react"

// Investment data with detailed classification
const investmentDetails = {
  stocks: [
    {
      id: 1,
      name: "Apple Inc.",
      symbol: "AAPL",
      price: 187.65,
      change24h: 0.8,
      holdings: 15,
      value: 2814.75,
      allocation: 1.97,
      category: "Technology",
      risk: "Medium",
    },
    {
      id: 2,
      name: "Microsoft",
      symbol: "MSFT",
      price: 350.85,
      change24h: -0.5,
      holdings: 12,
      value: 4210.2,
      allocation: 2.95,
      category: "Technology",
      risk: "Medium",
    },
    {
      id: 7,
      name: "Amazon",
      symbol: "AMZN",
      price: 178.35,
      change24h: 1.5,
      holdings: 18,
      value: 3210.3,
      allocation: 2.25,
      category: "Consumer Cyclical",
      risk: "Medium",
    },
    {
      id: 8,
      name: "Tesla",
      symbol: "TSLA",
      price: 245.2,
      change24h: -1.2,
      holdings: 10,
      value: 2452.0,
      allocation: 1.72,
      category: "Automotive",
      risk: "High",
    },
    {
      id: 9,
      name: "Johnson & Johnson",
      symbol: "JNJ",
      price: 152.5,
      change24h: 0.3,
      holdings: 20,
      value: 3050.0,
      allocation: 2.14,
      category: "Healthcare",
      risk: "Low",
    },
    {
      id: 10,
      name: "JPMorgan Chase",
      symbol: "JPM",
      price: 195.2,
      change24h: 0.7,
      holdings: 15,
      value: 2928.0,
      allocation: 2.05,
      category: "Financial",
      risk: "Medium",
    },
  ],
  etfs: [
    {
      id: 3,
      name: "S&P 500 ETF",
      symbol: "VOO",
      price: 445.3,
      change24h: 1.2,
      holdings: 28,
      value: 12468.4,
      allocation: 8.75,
      category: "Large Cap",
      risk: "Medium",
    },
    {
      id: 6,
      name: "Vanguard Total Bond Market ETF",
      symbol: "BND",
      price: 75.2,
      change24h: 0.3,
      holdings: 50,
      value: 3760.0,
      allocation: 2.64,
      category: "Bonds",
      risk: "Low",
    },
    {
      id: 11,
      name: "iShares MSCI Emerging Markets ETF",
      symbol: "EEM",
      price: 42.8,
      change24h: -0.8,
      holdings: 100,
      value: 4280.0,
      allocation: 3.0,
      category: "Emerging Markets",
      risk: "High",
    },
    {
      id: 12,
      name: "Vanguard FTSE Developed Markets ETF",
      symbol: "VEA",
      price: 48.5,
      change24h: 0.5,
      holdings: 120,
      value: 5820.0,
      allocation: 4.08,
      category: "International",
      risk: "Medium",
    },
  ],
  bonds: [
    {
      id: 13,
      name: "US Treasury 10-Year",
      symbol: "USTY10",
      price: 98.5,
      change24h: 0.1,
      holdings: 100,
      value: 9850.0,
      allocation: 6.91,
      category: "Government",
      risk: "Low",
    },
    {
      id: 14,
      name: "Corporate Bond Fund",
      symbol: "VCIT",
      price: 85.2,
      change24h: 0.2,
      holdings: 120,
      value: 10224.0,
      allocation: 7.17,
      category: "Corporate",
      risk: "Medium",
    },
    {
      id: 15,
      name: "Municipal Bond Fund",
      symbol: "MUB",
      price: 105.8,
      change24h: 0.1,
      holdings: 45,
      value: 4761.0,
      allocation: 3.34,
      category: "Municipal",
      risk: "Low",
    },
  ],
  crypto: [
    {
      id: 4,
      name: "Bitcoin",
      symbol: "BTC",
      price: 28501.2,
      change24h: 4.7,
      holdings: 0.25,
      value: 7125.3,
      allocation: 5.0,
      category: "Cryptocurrency",
      risk: "High",
    },
    {
      id: 5,
      name: "Ethereum",
      symbol: "ETH",
      price: 1875.4,
      change24h: 3.2,
      holdings: 2.5,
      value: 4688.5,
      allocation: 3.29,
      category: "Cryptocurrency",
      risk: "High",
    },
    {
      id: 16,
      name: "Solana",
      symbol: "SOL",
      price: 145.8,
      change24h: 5.2,
      holdings: 15,
      value: 2187.0,
      allocation: 1.53,
      category: "Cryptocurrency",
      risk: "Very High",
    },
    {
      id: 17,
      name: "Cardano",
      symbol: "ADA",
      price: 0.45,
      change24h: -2.1,
      holdings: 5000,
      value: 2250.0,
      allocation: 1.58,
      category: "Cryptocurrency",
      risk: "High",
    },
  ],
  sips: [
    {
      id: 18,
      name: "Retirement SIP",
      symbol: "RSIP",
      price: 1.0,
      change24h: 0.0,
      holdings: 8000,
      value: 8000.0,
      allocation: 5.61,
      category: "Retirement",
      risk: "Medium",
      frequency: "Monthly",
      contribution: 500,
    },
    {
      id: 19,
      name: "Education SIP",
      symbol: "ESIP",
      price: 1.0,
      change24h: 0.0,
      holdings: 5000,
      value: 5000.0,
      allocation: 3.51,
      category: "Education",
      risk: "Medium",
      frequency: "Monthly",
      contribution: 300,
    },
    {
      id: 20,
      name: "Tax Saving SIP",
      symbol: "TSIP",
      price: 1.0,
      change24h: 0.0,
      holdings: 2000,
      value: 2000.0,
      allocation: 1.4,
      category: "Tax Saving",
      risk: "Low",
      frequency: "Quarterly",
      contribution: 600,
    },
  ],
}

export default function DetailedInvestmentBreakdown() {
  const [activeTab, setActiveTab] = useState("stocks")

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Get risk badge color
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Very High":
        return "bg-red-500 hover:bg-red-600"
      case "High":
        return "bg-orange-500 hover:bg-orange-600"
      case "Medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  // Calculate totals
  const calculateTotals = (category: string) => {
    const investments = investmentDetails[category as keyof typeof investmentDetails]
    const totalValue = investments.reduce((sum, item) => sum + item.value, 0)
    const totalChange = investments.reduce((sum, item) => {
      const changeValue = (item.value * item.change24h) / 100
      return sum + changeValue
    }, 0)
    const changePercentage = (totalChange / (totalValue - totalChange)) * 100

    return {
      totalValue,
      totalChange,
      changePercentage,
    }
  }

  const totals = calculateTotals(activeTab)

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Detailed Investment Breakdown</CardTitle>
        <CardDescription>Comprehensive view of your investments by category</CardDescription>
        <Tabs defaultValue="stocks" className="mt-2" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="etfs">ETFs</TabsTrigger>
            <TabsTrigger value="bonds">Bonds</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="sips">SIPs</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="text-2xl font-bold">{formatCurrency(totals.totalValue)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {investmentDetails[activeTab as keyof typeof investmentDetails].length} holdings
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">24h Change</div>
              <div
                className={`text-2xl font-bold flex items-center ${totals.totalChange >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                {totals.totalChange >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 mr-1" />
                )}
                {formatCurrency(Math.abs(totals.totalChange))}
              </div>
              <div className={`text-xs ${totals.totalChange >= 0 ? "text-emerald-500" : "text-red-500"} mt-1`}>
                {totals.totalChange >= 0 ? "+" : "-"}
                {Math.abs(totals.changePercentage).toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Portfolio Allocation</div>
              <div className="text-2xl font-bold">{((totals.totalValue / 142568.3) * 100).toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground mt-1">of total portfolio</div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-medium">Asset</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">24h</th>
                <th className="text-left p-3 font-medium">Holdings</th>
                <th className="text-left p-3 font-medium">Value</th>
                <th className="text-left p-3 font-medium">Category</th>
                <th className="text-left p-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {investmentDetails[activeTab as keyof typeof investmentDetails].map((investment) => (
                <tr key={investment.id} className="border-t hover:bg-muted/50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        {investment.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{investment.name}</p>
                        <p className="text-xs text-muted-foreground">{investment.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{formatCurrency(investment.price)}</td>
                  <td className={`p-3 ${investment.change24h >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    <div className="flex items-center">
                      {investment.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {investment.change24h >= 0 ? "+" : ""}
                      {investment.change24h}%
                    </div>
                  </td>
                  <td className="p-3">
                    {investment.holdings}{" "}
                    {activeTab === "crypto" ? "tokens" : activeTab === "sips" ? "units" : "shares"}
                  </td>
                  <td className="p-3 font-medium">{formatCurrency(investment.value)}</td>
                  <td className="p-3">
                    <Badge variant="outline">{investment.category}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge className={getRiskBadgeColor(investment.risk)}>{investment.risk}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
