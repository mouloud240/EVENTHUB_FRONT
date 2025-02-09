
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="container mx-auto py-6">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Event Hub</h1>
        <p className="text-xl mb-8">Discover and join amazing events in your area</p>
        <Link href="/events">
          <Button size="lg">Browse Events</Button>
        </Link>
      </div>
    </main>
  )
}


