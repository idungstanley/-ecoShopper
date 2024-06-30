'use client'
import React, { ReactNode, useEffect, useState } from 'react'

type LatLngLiteral = google.maps.LatLngLiteral

const CardButton = ({
  icon,
  title,
  distance,
  onclick,
}: {
  icon: ReactNode
  title: string
  distance?: string
  onclick: (value: string) => void
}) => {
  const [myCoordinates, setMyCoordinates] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  return (
    <div
      className="montserrat-1 cursor-pointer rounded-lg flex items-center justify-between bg-[#292929] text-white w-full p-2"
      onClick={()=> onclick(title)}
    >
      <div className="flex items-center gap-4">
        <div className="bg-[#373737] w-7 h-7 rounded-md text-[#6ddd89] flex items-center justify-center p-1">
          {icon}
        </div>
        <div className="flex flex-col items-start justify-center text-[15px]">
          <div>{title}</div>
          <div className="text-[12px]">
            Lat: {myCoordinates.lat} - Lng: {myCoordinates.lng}
          </div>
        </div>
      </div>
      <div className="text-[10px]">{distance}</div>
    </div>
  )
}

export default CardButton
