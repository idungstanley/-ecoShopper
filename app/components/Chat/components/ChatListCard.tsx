import { setSelectedChatId } from '@/app/features/chat/chatSlice'
import { useAppDispatch } from '@/app/redux/store'
import socket from '@/app/utils/socket';
import Image from 'next/image'
import React from 'react'
import { LuCheckCheck } from 'react-icons/lu'

const ChatListCard = ({
  userImg,
  message,
  fullName,
  id,
}: {
  time?: string
  userImg: string
  fullName?: string
  message?: string
  id: string
}) => {
  const dispatch = useAppDispatch()
  const handleSelectChat = () => {
    dispatch(setSelectedChatId(id))
    socket.emit('joinChat', id)
  }
  return (
    <div
      className="flex items-center w-full h-[80px] gap-2 px-2 cursor-pointer"
      onClick={handleSelectChat}
    >
      <Image
        src={userImg !== null ? userImg : '/profileIcon.svg'}
        alt="author"
        width={40}
        height={40}
        className="object-cover w-[40px] h-[40px] rounded-[50%] border-[2.5px] border-brand-500"
      />
      <div className="border-b-[1px] border-gray-200 flex-1 h-full flex flex-col justify-center">
        <span className="w-full flex items-center justify-between">
          <p className="text-[15px] text-[#525252] font-bold text-left">
            {fullName}
          </p>
          <p className="text-[12px]">12:00am</p>
        </span>
        <div className="p-1 px-2 rounded-r-lg rounded-b-lg max-w-[300px] truncate flex gap-1 items-center">
          <span>
            <LuCheckCheck />
          </span>
          <p className="text-[12px] text-[#343D45] leading-[179.5%] text-left whitespace-pre-wrap w-full truncate">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatListCard
