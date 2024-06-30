'use client'
import CardButton from '@/app/components/ButtonWithText'
import Distance from '@/app/components/distance';
import Input from '@/app/components/inputs/Input'
import { useRoutePlanner } from '@/app/features/map/mapService'
import React, { useEffect, useState } from 'react'
import { FaHospital } from 'react-icons/fa'
import { HiMiniHome } from 'react-icons/hi2'
import { IoFastFood } from 'react-icons/io5'
import { MdMyLocation } from 'react-icons/md'

type LatLngLiteral = google.maps.LatLngLiteral

const RoutePlannerPage = () => {
  const { data, mutateAsync } = useRoutePlanner()
  const [routeOption, setRouteOption] = useState('')
  const handleClick = (value: string) => {
    setRouteOption(value)
  }

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

  const handleSearch = () => {
    mutateAsync({
      currentLocation: [myCoordinates.lng, myCoordinates.lat],
      destinationType: routeOption.toLowerCase(),
    })
  }

  return (
    <div className="my-4">
      <Input
        borderRadius="rounded-lg"
        trailingIcon={
          <div className="text-[#373737] w-7 h-7 rounded-md bg-[#6ddd89] flex items-center justify-center p-1">
            <MdMyLocation />
          </div>
        }
        trailingClick={handleSearch}
        value={routeOption}
        placeholder="Search for safe places"
        name="search"
        classes="h-[40px] text-gray-800 bg-[#E8E9EB]"
        onChange={() => ({})}
      />
      <div className=" flex flex-col gap-2 space-y-4 mt-4">
        <p>Find Safe Places Below</p>
        <div className="flex flex-col items-start w-full gap-4">
          <CardButton
            title="Shelter"
            onclick={handleClick}
            icon={<HiMiniHome className="w-5 h-5" />}
          />
          <CardButton
            title="Food"
            icon={<IoFastFood className="w-5 h-5" />}
            onclick={handleClick}
          />
          <CardButton
            title="Hospital"
            icon={<FaHospital className="w-5 h-5" />}
            onclick={handleClick}
          />
        </div>
      </div>
      {/* <Distance leg={data}/> */}
    </div>
  )
}

export default RoutePlannerPage
