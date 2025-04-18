import { PlusIcon } from "lucide-react"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import FinancialOverview from "@/components/financial-overview"
import ExpenseBreakdown from "@/components/expense-breakdown"
import InvestmentSummary from "@/components/investment-summary"
import GoalProgress from "@/components/goal-progress"
import RealTimeInvestmentChart from "@/components/real-time-investment-chart"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Link href="/transactions/new" className="flex items-center gap-1">
                <PlusIcon className="h-4 w-4" />
                Add Transaction
              </Link>
            </Button>
            <Button>
              <Link href="/planning" className="flex items-center gap-1">
                Financial Planning
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <RealTimeInvestmentChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FinancialOverview />
          <ExpenseBreakdown />
          <GoalProgress />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-2">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${transaction.type === "expense" ? "bg-red-100" : "bg-green-100"}`}
                    >
                      {transaction.type === "expense" ? (
                        <span className="text-red-500">-</span>
                      ) : (
                        <span className="text-green-500">+</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={transaction.type === "expense" ? "text-red-500" : "text-green-500"}>
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              <Link href="/transactions">View All Transactions</Link>
            </Button>
          </div>

          <InvestmentSummary />
        </div>
      </main>
    </div>
  )
}

// Sample data
const recentTransactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    category: "Food & Supplies",
    amount: 78.52,
    date: "Today, 2:30 PM",
    type: "expense",
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    amount: 2450.0,
    date: "Yesterday",
    type: "income",
  },
  {
    id: 3,
    description: "Utilities Payment",
    category: "Bills",
    amount: 145.8,
    date: "Mar 15, 2023",
    type: "expense",
  },
  {
    id: 4,
    description: "Stock Dividend",
    category: "Investment",
    amount: 32.4,
    date: "Mar 12, 2023",
    type: "income",
  },
]
