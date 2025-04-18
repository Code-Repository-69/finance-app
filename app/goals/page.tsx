import { PlusIcon } from "lucide-react"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GoalsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Financial Goals</h1>
          <Button>
            <Link href="/goals/new" className="flex items-center gap-1">
              <PlusIcon className="h-4 w-4" />
              New Goal
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="mb-8">
          <TabsList>
            <TabsTrigger value="active">Active Goals</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals
                .filter((goal) => goal.current / goal.target < 1)
                .map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{goal.name}</CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Edit
                        </Button>
                      </div>
                      <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{Math.round((goal.current / goal.target) * 100)}%</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">${goal.current.toFixed(0)}</p>
                          <p className="text-xs text-muted-foreground">Current</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${goal.target.toFixed(0)}</p>
                          <p className="text-xs text-muted-foreground">Target</p>
                        </div>
                      </div>

                      <div className="pt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monthly Contribution</span>
                          <span className="font-medium">${goal.monthlyContribution.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Time Remaining</span>
                          <span className="font-medium">{goal.timeRemaining}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Target Date</span>
                          <span className="font-medium">{goal.targetDate}</span>
                        </div>
                      </div>

                      <Button className="w-full">Add Funds</Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals
                .filter((goal) => goal.current / goal.target >= 1)
                .map((goal) => (
                  <Card key={goal.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{goal.name}</CardTitle>
                        <div className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                          Completed
                        </div>
                      </div>
                      <CardDescription>{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={100} className="h-2 bg-emerald-100" />

                      <div className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">${goal.current.toFixed(0)}</p>
                          <p className="text-xs text-muted-foreground">Saved</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${goal.target.toFixed(0)}</p>
                          <p className="text-xs text-muted-foreground">Target</p>
                        </div>
                      </div>

                      <div className="pt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed On</span>
                          <span className="font-medium">{goal.completedDate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Time Taken</span>
                          <span className="font-medium">{goal.timeTaken}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Goal Tips</CardTitle>
            <CardDescription>Strategies to help you achieve your financial goals faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">50/30/20 Rule</h3>
                <p className="text-sm text-muted-foreground">
                  Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment to stay on
                  track.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Automate Savings</h3>
                <p className="text-sm text-muted-foreground">
                  Set up automatic transfers to your savings accounts on payday to make saving effortless.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Regularly review your goals to stay motivated and make adjustments as needed to stay on course.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    description: "3 months of living expenses",
    target: 10000,
    current: 8500,
    monthlyContribution: 500,
    timeRemaining: "3 months",
    targetDate: "Jul 15, 2023",
  },
  {
    id: 2,
    name: "Down Payment",
    description: "For a new home",
    target: 60000,
    current: 35000,
    monthlyContribution: 2000,
    timeRemaining: "1 year, 1 month",
    targetDate: "May 10, 2024",
  },
  {
    id: 3,
    name: "Vacation",
    description: "Trip to Europe",
    target: 3000,
    current: 1200,
    monthlyContribution: 300,
    timeRemaining: "6 months",
    targetDate: "Oct 20, 2023",
  },
  {
    id: 4,
    name: "New Laptop",
    description: "For work and personal use",
    target: 1500,
    current: 1500,
    completedDate: "Feb 15, 2023",
    timeTaken: "4 months",
  },
  {
    id: 5,
    name: "Pay Off Credit Card",
    description: "Clear high-interest debt",
    target: 4500,
    current: 4500,
    completedDate: "Jan 5, 2023",
    timeTaken: "8 months",
  },
]
