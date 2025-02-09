import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">Loading events...</p>
    </div>
  )
}

