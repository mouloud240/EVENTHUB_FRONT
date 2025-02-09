
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import { auth } from "../lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()
  const { login,signup } = useAuth()
  

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name) newErrors.name = "Name must be provided"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email is invalid"
    if (!/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/.test(password)) {
      newErrors.password = "Password must be at least 8 characters long, contain 1 uppercase letter and 1 symbol"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await signup(name, email, password)
         } catch (error) {
      console.error("Signup failed:", error)
      toast.error("Signup failed. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

