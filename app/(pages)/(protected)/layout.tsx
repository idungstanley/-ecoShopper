'use client'
import Chat from '@/app/components/Chat'
import Map from '@/app/components/map'
import NavHeader from '@/app/components/nav/NavHeader'
import { useGetAllUser, useGetSelf } from '@/app/features/auth/authService'
import { useGetResource } from '@/app/features/map/mapService'
import { cn } from '@/lib/utils'
import { useLoadScript } from '@react-google-maps/api'
import { getSession } from 'next-auth/react'
import { Poppins } from 'next/font/google'
import React, { useEffect, useRef, useState } from 'react'
import { SiChatbot } from 'react-icons/si'
import { PacmanLoader } from 'react-spinners'
import { useClickAway } from 'react-use'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const layout = ({ children }: { children: React.ReactNode }) => {
  useGetResource()
  useGetSelf()
  useGetAllUser()

  const [showChat, setShowChat] = useState<boolean>(false)
  const ref = useRef(null)

  useClickAway(ref, () => setShowChat(false))

  useEffect(() => {
    const storeToken = async () => {
      const session = await getSession()
      const token = session?.user?.token

      if (token) {
        localStorage.setItem('token', JSON.stringify(token?.token))
      }
    }

    storeToken()
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  })
  if (!isLoaded)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <PacmanLoader color="#1c5754" />
      </div>
    )

  return (
    <div className={cn('flex w-full h-full relative', font.className)}>
      <div className="basis-1/5 p-4 text-[20px] w-full border-r border-gray-300 bg-[#1b1b1b] text-white">
        <NavHeader />
        {children}
      </div>
      <div className="flex basis-4/5">
        <div className="h-screen w-full">
          <Map />
        </div>
      </div>
      <div ref={ref}>
        {showChat && <Chat />}
        <span
          className="absolute bottom-6 flex items-center justify-center p-2 bg-white rounded-full right-4 z-[9999]"
          onClick={() => setShowChat((prev) => !prev)}
        >
          <SiChatbot className="text-[40px] text-[#1b1b1b]" />
        </span>
      </div>
    </div>
  )
}

export default layout
