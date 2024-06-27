import { setBacktoChatList } from '@/app/features/chat/chatSlice'
import { useAppDispatch } from '@/app/redux/store'
import React from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Box, TextField } from '@radix-ui/themes'
import { CiSearch } from 'react-icons/ci'
import { BsThreeDots } from 'react-icons/bs';

const ChatHeader = () => {
  const dispatch = useAppDispatch()
  const handleCollapse = () => {
    dispatch(setBacktoChatList(true))
  }
  return (
    <div className="relative flex flex-col items-center justify-between w-full min-h-[70px] border-b border-gray-300 p-3 text-[20px]">
      <div className="flex w-full items-center justify-between">
        <span
          className="text-[20px] text-gray-600 hover:cursor-pointer hover:text-black hover:text-[24px] transition-all ease-in-out"
          onClick={() => handleCollapse()}
        >
          <BsThreeDots />
        </span>
        <div
          className="text-[30px] my-3 relative font-extrabold text-gray-600
        "
        >
          Chats
        </div>
        <FaCirclePlus />
      </div>
      <Box className='w-full'>
        <TextField.Root placeholder="Search chat or groups. . ." size="2">
          <TextField.Slot>
            <CiSearch height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
    </div>
  )
}

export default ChatHeader
