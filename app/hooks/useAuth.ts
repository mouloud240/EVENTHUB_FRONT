
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "../lib/axios"
import { auth } from "../lib/api"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { getErrorMessage } from "../lib/error-handler"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("AccesToken")
    if (token) {
      try {
        const { data } = await auth.protected()
        console.log(data);
        setUser(data)
      } catch (error) {
        
        console.error("Auth check failed:", error)
      }
    }
    setLoading(false)
  }

  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined
  }
  const login = async (email: string, password: string) => {
    try {
      const { data } = await auth.login(email, password)
      console.log(data);
      localStorage.setItem("AccesToken", data. AccessToken)
      localStorage.setItem('RefreshToken',data.RefreshToken)
      setUser(data.user)
       toast.success("Logged in successfully!")

      api.defaults.headers.common["Authorization"] = `Bearer ${data.accesToken}`
      setTimeout(()=>{      window.location.href = "/";     },1000)

    } catch (error:unknown) {

      if (isAxiosError(error)){

        console.log(error);

      }
            console.log(error);
      toast.error("Login failed. Please check your credentials.")
    }
  }
     const loginWithGoogle = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/google/login`;    
  
  }   

  const handleGoogleRedirect = async (data:{accessToken:string,refreshToken:string}) => {
    try {
      localStorage.setItem("AccesToken", data.accessToken)
      localStorage.setItem("RefreshToken", data.refreshToken)
      api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`
      router.push("/")
      toast.success("Logged in with Google successfully!")
    } catch (error) {
      console.error(error);
      toast.error("Google login failed. Please try again.")
    }
  }  
  const signup = async (name: string, email: string, password: string) => {
    try {
      await auth.signup(name, email, password)
      toast.success('Signup successful! Please log in.')
      return await login(email, password)
    } catch (error) {
     return getErrorMessage(error);
    }

  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    delete api.defaults.headers.common["Authorization"]
    router.push("/login")
    toast.success("Logged out successfully!")
  }

  return { user, loading, login, logout,signup,loginWithGoogle,handleGoogleRedirect }
}

