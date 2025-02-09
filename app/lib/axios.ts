
import axios from "axios"
import { auth } from "./api"

//TODO: Add refresh token logic
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
})

const noAuthRoutes = ["/auth/login"]

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  if (noAuthRoutes.includes(config.url!)) {
    return config
  }

  // Ensure localStorage is accessed only on the client
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("AccesToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (!token) {

      window.location.href = "/login"
    }
  }

  return config
})
//api.interceptors.response.use(
//  (response) => response,
//  (error) => {
//    if (error.response?.status === 401) {
//      // Unauthorized, clear token and redirect to login
//
//        localStorage.getItem('RefreshToken')
//         auth.refresh().then((res)=>{
//        localStorage.setItem('AccesToken',res.data.accessToken)
//        localStorage.setItem('RefreshToken',res.data.refreshToken)
//        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
//        return Promise.resolve()
//      }).catch((err)=>{
//        window.location.href='/login'
//      })
//          }
//    return Promise.reject(error)
//  }
//)

export default api

