
"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "../components/protected-route"
import { rsvp, events } from "../lib/api"
import { EventCard } from "../components/event-card"
import { toast } from "react-toastify"
import type { Event } from "../types/event"
import { RSVP, RSVPWithEventDetails } from "../types/rsvp"
import { RSVPCard } from "../components/rsvp-card"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [userRsvps, setUserRsvps] = useState<RSVPWithEventDetails[]>([])

  const router=useRouter()
  const [userEvents,setUserEvents]=useState<Event[]>([])
  useEffect(() => {
    const fetchUserEvents=async()=>{
      try {
        const {data}=await events.getUserEvents();
        setUserEvents(data)
      }catch(e){
console.error (e)
        toast.error("Failed to Get User Events.")

      }
    }
    const fetchUserRsvps = async () => {
      try {
        const { data } = await rsvp.getUserRsvps()
        console.log(data);
        // Assuming the API returns event IDs, we need to fetch the full event details
        setUserRsvps(data)
      } catch (error) {
        console.error("Failed to fetch user RSVPs:", error)
        toast.error("Failed to load your RSVPs. Please try again.")
      }
    }
    

    fetchUserEvents()
    fetchUserRsvps()
  }, [])
  const handleEditEvent=async(eventId:string)=>{
    router.push(`/events/${eventId}/edit`)
  
  }
  const handleAcceptRsvp= async (rsvpId: string,eventId:string) => {
    try {
      await rsvp.update(rsvpId, "ACCEPTED",eventId)
      setUserRsvps((prevRsvps) =>
        prevRsvps.map((rsvp) => (rsvp.id === rsvpId ? { ...rsvp, status: "ACCEPTED" } : rsvp))
      )
      toast.success("RSVP accepted successfully")
    } catch (error) {
      console.error("Failed to accept RSVP:", error)
      toast.error("Failed to accept RSVP. Please try again.")
    }
  }
  const handleRejectRsvp=async(rsvpId:string,eventId:string)=>{
        try {
      await rsvp.update(rsvpId, "REJECTED",eventId)
      setUserRsvps((prevRsvps) =>
        prevRsvps.map((rsvp) => (rsvp.id === rsvpId ? { ...rsvp, status: "REJECTED" } : rsvp))
      )
      toast.success("RSVP accepted successfully")
    } catch (error) {
      console.error("Failed to accept RSVP:", error)
      toast.error("Failed to accept RSVP. Please try again.")
    }

  }
  const handleCancelRsvp = async (rsvpId: string) => {
    try {
      await rsvp.delete(rsvpId)
      setUserRsvps((prevRsvps) => prevRsvps.filter((rsvp) => rsvp.id !== rsvpId))
      toast.success("RSVP cancelled successfully")
    } catch (error) {
      console.error("Failed to cancel RSVP:", error)
      toast.error("Failed to cancel RSVP. Please try again.")
    }
  }
  const handelDeleteEvent=async(eventId:string)=>{
    try {
      await events.delete(eventId);
      setUserEvents((prevEvents)=>prevEvents.filter((event)=>event.id!==eventId))
      toast.success("Event Deleted Successfully")
    }catch(e){
      console.error(e)
      toast.error("Failed to delete event")
  }
  }
  return (
    <ProtectedRoute>
      
      <div className="container mx-auto py-6 flex flex-col gap-10">
  <h1 className="mb-8 text-4xl font-bold">Your Events</h1>
        {userEvents.length === 0 ? (
          <p className="text-center text-muted-foreground">You have no Events created .</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userEvents.map((event) => (
                
                  <EventCard  key={event.id} event={event} onDelete={handelDeleteEvent} onEdit={handleEditEvent}   isUserEvent={true} />
            ))}
          </div>
        )}

        <h1 className="mb-8 text-4xl font-bold">Your RSVPs</h1>
        {userRsvps.length === 0 ? (
          <p className="text-center text-muted-foreground">You haven't RSVP'd to any events yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userRsvps.map((event) => (
                
              <RSVPCard  key={event.id} rsvp={event} onAccept={()=>handleAcceptRsvp(event.id,event.EventId)}  onCancel={() => handleCancelRsvp(event.id)}  onReject={()=>handleRejectRsvp(event.id,event.EventId)} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}

