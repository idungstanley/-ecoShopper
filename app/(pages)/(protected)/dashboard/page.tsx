'use client'
import Map from '@/app/components/map'
import SidebarMenu from '@/app/components/Sidebar'
import { useLoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'

const Dashboard = () => {
  const [open, setOpen] = useState(true)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  })

  if (!isLoaded)
    return (
      <div className="flex w-full h-screen items-center justify-center">
        Loading...
      </div>
    )
  return <SidebarMenu setOpen={setOpen} open={open} />
}

export default Dashboard
