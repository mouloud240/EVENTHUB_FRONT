
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { events } from "@/app/lib/api"
import EditEventForm from "./edit-event-form"
import type { Event } from "@/app/types/event"
import { isAxiosError } from "axios"

async function getEvent(id: string): Promise<Event> {
  try {
    const { data } = await events.getOne(id)
    return data
  } catch (error:unknown) {
  if (isAxiosError(error)){
  console.error("Failed to fetch event:", error.request)
      

  }
      notFound()
  }
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  console.log(params.id);

  const event = await getEvent(params.id)

  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Event</h1>
      <Suspense fallback={<div>Loading event details...</div>}>
        {    <EditEventForm event={event} />
        } 
      </Suspense>
    </div>
  )
}

