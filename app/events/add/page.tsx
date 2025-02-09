
import { AddEventForm } from "@/app/components/add-event-Form"

export default function AddEventPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Add New Event</h1>
      <div className="mx-auto max-w-2xl">
        <AddEventForm />
      </div>
    </div>
  )
}


