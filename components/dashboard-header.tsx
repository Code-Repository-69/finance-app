"use client"

import { useState } from "react"
import Link from "next/link"
import { BellIcon, MenuIcon, Search, UserIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-2 font-semibold text-xl" href="/">
            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">FP</div>
            <span>FinPlanner</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="/">
              Dashboard
            </Link>
            <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="/transactions">
              Transactions
            </Link>
            <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="/budgeting">
              Budgeting
            </Link>
            <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="/investments">
              Investments
            </Link>
            <Link className="text-sm font-medium hover:text-emerald-600 transition-colors" href="/goals">
              Goals
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-64 pl-8 rounded-full bg-muted border-none" />
          </div>

          <Button variant="ghost" size="icon" className="rounded-full">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Link className="flex items-center gap-2 font-semibold text-xl" href="/">
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  FP
                </div>
                <span>FinPlanner</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="grid gap-2 p-4">
              <Link className="flex items-center gap-2 p-2 text-sm font-medium hover:bg-muted rounded-lg" href="/">
                Dashboard
              </Link>
              <Link
                className="flex items-center gap-2 p-2 text-sm font-medium hover:bg-muted rounded-lg"
                href="/transactions"
              >
                Transactions
              </Link>
              <Link
                className="flex items-center gap-2 p-2 text-sm font-medium hover:bg-muted rounded-lg"
                href="/budgeting"
              >
                Budgeting
              </Link>
              <Link
                className="flex items-center gap-2 p-2 text-sm font-medium hover:bg-muted rounded-lg"
                href="/investments"
              >
                Investments
              </Link>
              <Link className="flex items-center gap-2 p-2 text-sm font-medium hover:bg-muted rounded-lg" href="/goals">
                Goals
              </Link>
              <div className="border-t my-2"></div>
              <Link
                className="flex items-center gap-2 p-2 text-sm font-medium hover:bg-muted rounded-lg"
                href="/profile"
              >
                Profile
              </Link>
              <Link
                className="flex items-center gap-2 p-2 text-sm font-medium hover:bg-muted rounded-lg"
                href="/settings"
              >
                Settings
              </Link>
              <Button variant="outline" className="mt-2">
                Log out
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
