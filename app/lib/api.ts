import api from "./axios"
import type { Event, User } from "../types/event"

// Auth endpoints
// TODO: use Classes
export const auth = {
    signup: (name: string, email: string, password: string) => api.post("/auth/register", { name, email, password }),

  login: (email: string, password: string) => api.post("/auth/login", { email, password }),

  googleLogin: () => api.get("/auth/google/login"),

  refresh: () => api.post("/auth/refresh"),

  protected: () => api.get("/auth/protected"),
}

// User endpoints
export const users = {
  getAll: () => api.get<User[]>("/users"),

  getOne: (id: string) => api.get<User>(`/users/${id}`),

  update: (id: string, data: Partial<User>) => api.patch(`/users/${id}`, data),

  delete: (id: string) => api.delete(`/users/${id}`),
}

// Event endpoints
export const events = {
  getAll: () => api.get<Event[]>("/events"),

  getPages: (page: number) => api.get<Event[]>(`/events/pages?page=${page}`),

  getOne: (id: string) => api.get<Event>(`/events/${id}`),

  create: (data: Omit<Event, "id">) => api.post("/events", data),

  update: (id: string, data: Partial<Event>) => api.patch(`/events/${id}`, data),

  delete: (id: string) => api.delete(`/events/${id}`),
}

// RSVP endpoints
export const rsvp = {
  create: (EventId: string) => api.post("/rsvp", { EventId }),

  getAll: () => api.get("/rsvp"),
  update: (id: string, status: "ACCEPTED"|"REJECTED"|"PENDING",EventId:string) => api.patch(`/rsvp/${id}`, { status,EventId }),

  getUserRsvps: () => api.get("/rsvp"),

  getEventRsvps: (eventId: string) => api.get(`/rsvp/event/${eventId}`),

  delete: (eventId: string) => api.delete(`/rsvp/${eventId}`),
}

// Mailer endpoints
export const mailer = {
  send: (data: { to: string; subject: string; body: string }) => api.post("/mailer", data),

  sendAll: (data: { subject: string; body: string }) => api.post("/mailer/all", data),
}

