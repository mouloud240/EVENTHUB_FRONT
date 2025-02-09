
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import Loading from "../loading"
import type React from "react" // Added import for React

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <Loading />
  }

  return user ? <>{children}</> : null
}

