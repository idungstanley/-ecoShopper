'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api'
import { FaHouseMedical } from "react-icons/fa6";

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions

const Map = () => {
  const [myCoordinates, setMyCoordinates] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  })
  const [directions, setDirections] = useState<DirectionsResult>()
  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43.45, lng: -80.49 }), [])
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    [],
  )

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const onLoad = useCallback((map) => (mapRef.current = map), [])

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={myCoordinates}
        options={options}
        mapContainerClassName="w-full h-screen"
        onLoad={onLoad}
      >
              <Marker position={myCoordinates} />
      </GoogleMap>
    </div>
  )
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
}
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
}

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = []
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    })
  }
  return _houses
}

export default Map
