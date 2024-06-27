import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiWarningCircleBold } from 'react-icons/pi'

const NavHeader = () => {
  const pathname = usePathname()
  const router = useRouter()
  const sideBarOptions = [
    { route: '/route-planner', label: 'Route Planner' },
    { route: '/report', label: 'Report' },
    { route: '/settings', label: 'Settings' },
  ]

  const activeRouteElement = useMemo(() => {
    return sideBarOptions.find((active) => active.route === pathname)
  }, [pathname])

  return activeRouteElement ? (
    <div>
      <div className="flex items-center justify-between">
        <IoMdArrowRoundBack
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h1 className="text-white">{activeRouteElement.label}</h1>
        <PiWarningCircleBold />
      </div>
    </div>
  ) : null
}

export default NavHeader
