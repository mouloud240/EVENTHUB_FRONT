
import type { Event } from "./event"
import type { User } from "./event"

export interface RSVP {
  id: string
  EventId: string
    userId: string
  createdAt: string
  updatedAt: string
  event?: Event
  user?: User
}

export interface RSVPWithEventDetails extends RSVP {
  event: Event
  status :"PENDING" | "ACCEPTED" | "REJECTED"

}

