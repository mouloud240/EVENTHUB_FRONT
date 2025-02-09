import type React from "react" // Importing React to fix the undeclared variable issue
import { Inter } from "next/font/google"
import { Providers } from "./components/providers"
import "./globals.css"
import { NavBar } from "./components/nav-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Event Hub",
  description: "Discover and join amazing events",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
<NavBar/>
          {children}
        </Providers>
      </body>
    </html>
  )
}

