'use client'
import Map from '@/app/components/map'
import SidebarMenu from '@/app/components/Sidebar'
import { useLoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'

const Dashboard = () => {
  const [open, setOpen] = useState(true)
  return <SidebarMenu setOpen={setOpen} open={open} />
}

export default Dashboard
