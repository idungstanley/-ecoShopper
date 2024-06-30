'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api'
import { useGetResource } from '@/app/features/map/mapService'
import { useAppSelector } from '@/app/redux/store';

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions
interface ResourceProps {
  type: string
  location: {
    lat: number
    lng: number
  }
  name: string
}

const Map = () => {
  const { data } = useGetResource()
  const [myCoordinates, setMyCoordinates] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  })
  const {resources, plannerCoordinates} = useAppSelector(state=> state.map)
  const [directions, setDirections] = useState<DirectionsResult>()
  const mapRef = useRef<GoogleMap>()
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

  const onLoad = useCallback((map: any) => (mapRef.current = map), [])
  const resourceLocation = useMemo<ResourceProps[]>(() => {
    return resources?.map((item) => ({
      type: item.type,
      location: {
        lat: item.location.coordinates[1],
        lng: item.location.coordinates[0],
      },
      name: item.name,
    })) as ResourceProps[]
  }, [resources])

  const fetchDirections = (destination: LatLngLiteral) => {
    if (!myCoordinates) return
    const service = new google.maps.DirectionsService()
    service.route(
      {
        origin: myCoordinates,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result)
        }
      },
    )
  }

  useEffect(() => {
    fetchDirections({lat: plannerCoordinates[1], lng: plannerCoordinates[0]})
  },[plannerCoordinates])

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={myCoordinates}
        options={options}
        mapContainerClassName="w-full h-screen"
        onLoad={onLoad}
      >
        <>
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeWeight: 5,
                },
              }}
            />
          )}
          <Marker
            position={myCoordinates}
            icon={{
              url: '/home-locations.png',
              scaledSize: new google.maps.Size(70, 70),
              size: new google.maps.Size(70, 70),
            }}
          />
          <MarkerClusterer>
            {(clusterer) =>
              // @ts-ignore
              resourceLocation?.map((resource) => (
                <Marker
                  clusterer={clusterer}
                  key={resource.location.lat}
                  position={resource.location}
                  icon={{
                    url:
                      resource.type === 'food'
                        ? '/food-location.png'
                        : '/hospital.png',
                    scaledSize: new google.maps.Size(70, 70),
                    size: new google.maps.Size(70, 70),
                  }}
                  onClick={() => {
                    fetchDirections(resource.location)
                  }}
                />
              ))
            }
          </MarkerClusterer>
          <Circle
            center={myCoordinates}
            radius={15000}
            options={closeOptions}
          />
          <Circle
            center={myCoordinates}
            radius={30000}
            options={middleOptions}
          />
          <Circle center={myCoordinates} radius={45000} options={farOptions} />
        </>
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
  strokeColor: '#62ae0b',
  fillColor: '#62ae0b',
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
