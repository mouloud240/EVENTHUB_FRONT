"use client"

import { useAuth } from "@/app/hooks/useAuth"
import Loading from "@/app/loading"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"

const page = () => {
  
  const {handleGoogleRedirect}=useAuth()
  const searchParams = useSearchParams();
  const router = useRouter()
  useEffect(() => {
    const accessToken = searchParams.get("accessToken")??""
    const refreshToken=searchParams.get('refreshToken')??""
      console.log(accessToken,refreshToken)

   if (!accessToken || !refreshToken){
      router.push('/login')
      toast.error("Failed to login with Google ");
      
    }
         handleGoogleRedirect({accessToken,refreshToken })
      }, [searchParams, handleGoogleRedirect])
  return (
    <div><Loading/></div>
  )
}

export default page
