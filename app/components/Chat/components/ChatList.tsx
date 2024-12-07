'use client'
import React from 'react'
import { BsChatSquareText } from 'react-icons/bs'
import ChatListCard from './ChatListCard'
import { ChatProps } from '@/app/features/chat/chat.interface'
import { ClipLoader } from 'react-spinners'

const ChatList = ({
  chats,
  joinChat,
  isChatsLoading,
}: {
  chats: ChatProps[]
  joinChat: ()=> void
  isChatsLoading: boolean
}) => {
  if (isChatsLoading || !chats) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader />
      </div>
    )
  }
  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 text-center">
        <BsChatSquareText size={100} />
        <p>Create or join a chat</p>
      </div>
    )
  }
  return (
    <div className="flex-col items-start justify-start w-full h-[580px] overflow-y-auto text-center flex grow">
      <div className="flex flex-col items-start justify-start w-full">
        {chats.map((msg, index) => (
          <ChatListCard
            key={index}
            id={msg._id}
            fullName={msg.name}
            message="Click to view chat"
            userImg="/home-locations.png"
          />
        ))}
      </div>
    </div>
  )
}

export default ChatList
