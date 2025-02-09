import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import type { Event } from "../types/event"

//TODO fix this type to be more accurate
interface EventCardProps {
  event: Event
  onRegister?: (eventId: string) => void
  onDelete?: (eventId: string) => void
  isUserEvent?:boolean
  onEdit?: (eventId: string) => void
}

export function EventCard({onDelete=(id)=>id, event, onRegister ,isUserEvent=false,onEdit}: EventCardProps) {
  return (
    <Card className="overflow-hidden">
             <div className="aspect-video w-full overflow-hidden">
          <img src={event.coverPic || "/placeholder.svg"} alt={event.name} className="h-full w-full object-cover" />
        </div>
           <CardHeader>
        <h3 className="text-2xl font-bold">{event.name}</h3>
        <p className="text-muted-foreground">{event.description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{event.city}</span>
        </div>
      </CardContent>
      <CardFooter>
        {isUserEvent ?(
          <div className="flex justify-around w-full"> <Button onClick={()=>onEdit?.(event.id)} className="w-full bg-blue-500" variant="default">
            Edit Event
          </Button>
          <Button onClick={()=>onDelete?.(event.id)}  className="w-full" variant="destructive">
            Delete Event
          </Button>
          </div>
        ):(
                <Button onClick={() => onRegister?.(event.id)} className="w-full">
          Register for Event
        </Button>

        )}
      </CardFooter>
    </Card>
  )
}

