

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react'
import { RSVPWithEventDetails } from "../types/rsvp"

interface RSVPCardProps {
  rsvp: RSVPWithEventDetails;
  onCancel: (rsvpId: string) => void;
  onAccept: (rsvpId: string) => void;
  onReject: (rsvpId: string) => void;
}

export function RSVPCard({ rsvp, onCancel ,onReject,onAccept}: RSVPCardProps) {
  return (
    <Card className="overflow-hidden">
           {rsvp.event.coverPic && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={rsvp.event.coverPic || "/placeholder.svg"}
            alt={rsvp.event.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <h3 className="text-2xl font-bold">{rsvp.event.name}</h3>
        <p className="text-muted-foreground">{rsvp.event.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>{new Date(rsvp.event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{rsvp.event.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span>RSVP'd on {new Date(rsvp.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-evenly w-full gap-2">

              
        { 
          rsvp.status=="ACCEPTED" && <Button onClick={()=>{onCancel(rsvp.id)}} variant={"default"} className="bg-red-500">
            Cancel rsvsp</Button>
        }
        {
          rsvp.status=="REJECTED" &&<div className="flex gap-2"> <Button onClick={()=>{onCancel(rsvp.id)}} variant={"default"} className="bg-red-500">
            Delete Rsvp </Button> 
            <Button onClick={()=>{onAccept(rsvp.id)}} variant={"default"} className="bg-green-500">
            Undo
            </Button>
          </div>        }
        {
          rsvp.status=="PENDING" &&<div className="flex gap-2"> <Button onClick={()=>{onAccept(rsvp.id)}} variant={"default"} className="bg-green-500">
            Accept
          </Button>
          <Button onClick={()=>{onReject(rsvp.id)}} variant={"default"} className="bg-red-500">
            Decline </Button>
          </div>        }
       
      </CardFooter>
    </Card>
  )
}
