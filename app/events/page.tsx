
"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getErrorMessage } from "./lib/error-handler"
import ErrorBoundary from "./components/error-boundary"
import { Event } from "./types/event"
import { isAxiosError } from "axios"
import { events, rsvp } from "../lib/api"
import Loading from "../loading"
import { EventCard } from "../components/event-card"
import { ProtectedRoute } from "../components/protected-route"

export default function HomePage() {
  const [eventList, setEventList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await events.getAll()
        console.log(res.data);
        setEventList(res.data)
        console.log(eventList);
      } catch (e) {
        setError(e)
        toast.error("Failed to fetch user events:")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleRSVP = async (eventId: string) => {
    try {
      await rsvp.create(eventId)
      toast.success("Successfully RSVP'd to the event!")
    } catch (error:unknown) {
      if (isAxiosError(error)){
        toast.error(error.response?.data)
      }
      toast.error('Error occured')
    }
  }

  
  if (loading) return <Loading />

  if (eventList.length === 0) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold">No Events Found</h2>
          <p className="text-muted-foreground">There are no upcoming events at the moment. Check back later!</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>    <main className="container mx-auto py-6">
      <h1 className="mb-8 text-4xl font-bold">Upcoming Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {eventList.map((event) => (
          <EventCard key={event.id} event={event} onRegister={handleRSVP} />
        ))}
      </div>
    </main>
    </ProtectedRoute>  )
}

