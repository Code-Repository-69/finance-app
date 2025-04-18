import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import RealTimeInvestmentChart from "@/components/real-time-investment-chart"
import InvestmentClassification from "@/components/investment-classification"
import DetailedInvestmentBreakdown from "@/components/detailed-investment-breakdown"
import { Button } from "@/components/ui/button"

export default function InvestmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Investment Portfolio</h1>
          <Button>
            <Link href="/investments/add">Add Investment</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <RealTimeInvestmentChart />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <InvestmentClassification />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <DetailedInvestmentBreakdown />
        </div>
      </main>
    </div>
  )
}
