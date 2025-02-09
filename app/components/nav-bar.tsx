
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events",protected:true },
  { href: "/dashboard", label: "Dashboard", protected: true },
]

export function NavBar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          Event Hub
        </Link>
        <div className="flex items-center space-x-4">
          {navItems.map((item) => {
            if (item.protected && !user) return null
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
          {user ? (
            <Button onClick={logout} variant="ghost">
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium">
                Login
              </Link>
              <Link href="/signup" className="text-sm font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


