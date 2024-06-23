'use client'
import Map from '@/app/components/map';
import { useLoadScript } from '@react-google-maps/api'
import React from 'react'

const Dashboard = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  })
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div className="h-screen w-full">
      <Map />
    </div>
  )
}

export default Dashboard
