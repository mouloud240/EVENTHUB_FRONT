"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import type React from "react" // Added import for React

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

