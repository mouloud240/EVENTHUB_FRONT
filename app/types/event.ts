export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  organizer: string
  city: string
  coverPic?: string
}

export interface User {
  id: string
  name: string
  email: string
  profilePic?: string
}

