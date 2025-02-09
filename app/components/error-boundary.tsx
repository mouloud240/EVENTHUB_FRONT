"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { WifiOff } from "lucide-react"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground">{error.message || "Unable to load events. Please try again."}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}

