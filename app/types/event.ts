export interface Event {
  id: string
  name: string
  description: string
  date: string
  createdBy: string
  city: string
  coverPic?: string
}

export interface User {
  id: string
  name: string
  email: string
  profilePic?: string
}

