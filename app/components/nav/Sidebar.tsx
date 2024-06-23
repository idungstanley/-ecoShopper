'use client'
import React from 'react'
import Input from '../inputs/Input'
import { CiSearch } from 'react-icons/ci'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { PiWarningCircleBold } from 'react-icons/pi'

const Sidebar = () => {
  return (
    <div className="basis-1/5 p-2 text-[20px] w-full border-r border-gray-300 bg-[#1b1b1b] text-white">
      <div className="flex items-center justify-between p-2">
        <IoMdArrowRoundBack />
        <h1>Commute?</h1>
        <PiWarningCircleBold />
      </div>
      <div className="m-2">
        <Input
          borderRadius="rounded-lg"
          trailingIcon={<CiSearch />}
          placeholder="Search"
          name="search"
          classes="h-[36px] text-gray-800 bg-[#E8E9EB]"
          onChange={() => ({})}
        />
      </div>
    </div>
  )
}

export default Sidebar
