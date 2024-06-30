import { signOut } from '@/auth'
import React from 'react'
import { LuPowerOff } from 'react-icons/lu'
import { SignOut } from './signout';

const Logout = () => {
  return (
    <form
      onClick={async () => {
        await SignOut()
      }}
    >
      <li className="flex p-2 justify-start cursor-pointer hover:bg-white hover:text-gray-500 rounded-md text-sm items-center gap-x-4">
        <LuPowerOff />
        <span className="origin-left duration-200">Logout</span>
      </li>
    </form>
  )
}

export default Logout
