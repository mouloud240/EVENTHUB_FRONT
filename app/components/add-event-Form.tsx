
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'
import { events } from '../lib/api'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export function AddEventForm() {
  const [capacity, setCapacity] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
   const [city, setCity] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData()
           if (image) {
        formData.append('coverImage', image)
      }
      else {
        toast.error('Please upload an image')
        return
      }
      const obj={
        name:title,
        description,
        date,  
        city,
        capacity
      }

      formData.append('data',JSON.stringify(obj))
      await events.create(formData)
      toast.success('Event created successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to create event:', error)
      toast.error('Failed to create event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <div>
          <Label htmlFor='capacity'>Capacity</Label>
          <Input id='capacity' type='number' value={capacity} onChange={(e)=>setCapacity(parseInt( e.target.value ))} required/>
        </div>
        <Label htmlFor="image">Event Image</Label>
        <Input
          id="image"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Event...
          </>
        ) : (
          'Create Event'
        )}
      </Button>
    </form>
  )
}
