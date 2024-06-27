'use client'
import React, { useMemo, useState } from 'react'
import Input from '../inputs/Input'
import { CiSearch } from 'react-icons/ci'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiWarningCircleBold } from 'react-icons/pi'
import SidebarMenu from '../Sidebar'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const pathname = usePathname()
  console.log(pathname)

  const sideBarOptions = [
    {
      route: '/dashboard',
      element: <SidebarMenu setOpen={setOpen} open={open} />,
    },
    { route: 'route-planner', element: <></> },
    { route: '/report', element: <></> },
    { route: '/settings', element: <></> },
  ]

  const activeRouteElement = useMemo(() => {
    return sideBarOptions.find((active) => active.route === pathname)
  }, [pathname])

  return (
    <div className="basis-1/5 p-4 text-[20px] w-full border-r border-gray-300 bg-[#1b1b1b] text-white">
      <div className="flex items-center justify-between p-2">
        <IoMdArrowRoundBack />
        <h1>Commute?</h1>
        <PiWarningCircleBold />
      </div>
      <div className="mb-4">
        <Input
          borderRadius="rounded-lg"
          trailingIcon={<CiSearch />}
          placeholder="Search"
          name="search"
          classes="h-[36px] text-gray-800 bg-[#E8E9EB]"
          onChange={() => ({})}
        />
      </div>
      {activeRouteElement && activeRouteElement.element}
    </div>
  )
}

export default Sidebar
