import { ArrowUpIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function BudgetingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Budgeting</h1>
          <div className="flex gap-4 items-center">
            <Select defaultValue="april">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="march">March 2023</SelectItem>
                <SelectItem value="april">April 2023</SelectItem>
                <SelectItem value="may">May 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Link href="/budgeting/new" className="flex items-center gap-1">
                <PlusIcon className="h-4 w-4" />
                New Budget
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,000.00</div>
              <p className="text-xs text-muted-foreground mt-1">Monthly budget</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,840.00</div>
              <p className="text-xs text-muted-foreground mt-1">71% of budget</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,160.00</div>
              <p className="text-xs text-muted-foreground mt-1">29% of budget</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Daily Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$38.67</div>
              <p className="text-xs text-muted-foreground mt-1">For remaining 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Track your spending across different budget categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {budgetCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <div className="text-sm font-medium">
                      ${category.spent.toFixed(2)} of ${category.budget.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(category.spent / category.budget) * 100} className="h-2 flex-1" />
                    <span className="text-sm w-16 text-right">
                      {Math.round((category.spent / category.budget) * 100)}%
                    </span>
                  </div>
                  {category.spent > category.budget && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <ArrowUpIcon className="h-3 w-3" />${(category.spent - category.budget).toFixed(2)} over budget
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your most recent spending activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-medium">Description</th>
                    <th className="text-left p-3 font-medium">Category</th>
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t hover:bg-muted/50">
                      <td className="p-3 font-medium">{transaction.description}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: transaction.categoryColor }}
                          ></div>
                          {transaction.category}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{transaction.date}</td>
                      <td
                        className={`p-3 font-medium ${transaction.type === "expense" ? "text-red-500" : "text-emerald-500"}`}
                      >
                        {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="ghost" className="w-full mt-4">
              <Link href="/transactions">View All Transactions</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

const budgetCategories = [
  {
    name: "Housing",
    budget: 1200,
    spent: 1200,
    color: "#4338ca",
  },
  {
    name: "Food & Dining",
    budget: 600,
    spent: 650,
    color: "#0891b2",
  },
  {
    name: "Transportation",
    budget: 400,
    spent: 350,
    color: "#0d9488",
  },
  {
    name: "Entertainment",
    budget: 200,
    spent: 250,
    color: "#7c3aed",
  },
  {
    name: "Utilities",
    budget: 250,
    spent: 200,
    color: "#0284c7",
  },
  {
    name: "Shopping",
    budget: 150,
    spent: 190,
    color: "#db2777",
  },
]

const transactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    category: "Food & Dining",
    categoryColor: "#0891b2",
    date: "Today, 2:30 PM",
    amount: 78.52,
    type: "expense",
  },
  {
    id: 2,
    description: "Salary Deposit",
    category: "Income",
    categoryColor: "#059669",
    date: "Yesterday",
    amount: 2450.0,
    type: "income",
  },
  {
    id: 3,
    description: "Utilities Payment",
    category: "Utilities",
    categoryColor: "#0284c7",
    date: "Mar 15, 2023",
    amount: 145.8,
    type: "expense",
  },
  {
    id: 4,
    description: "Monthly Rent",
    category: "Housing",
    categoryColor: "#4338ca",
    date: "Mar 10, 2023",
    amount: 1200.0,
    type: "expense",
  },
  {
    id: 5,
    description: "Netflix Subscription",
    category: "Entertainment",
    categoryColor: "#7c3aed",
    date: "Mar 7, 2023",
    amount: 15.99,
    type: "expense",
  },
]
