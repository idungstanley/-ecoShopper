'use client'
import React from 'react'
import { BsChatSquareText } from 'react-icons/bs'
import ChatListCard from './ChatListCard'
interface ChatListProps {
  reversedMessage: {
    id: string
    sender: {
      fullName: string
      image: string
    }
    message: string
  }[]
  setShowEmojiModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatList = ({ reversedMessage, setShowEmojiModal }: ChatListProps) => {
  if (!reversedMessage || reversedMessage.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 text-center">
        <BsChatSquareText size={100} />
        <p>Create or join a chat</p>
      </div>
    )
  }
  return (
    <div className="flex-col items-start justify-start hidden w-full h-[580px] overflow-y-auto text-center lg:flex grow">
      <div className="flex flex-col items-start justify-start w-full">
        {reversedMessage.map((msg, index) => (
          <ChatListCard
            key={index}
            id={msg.id}
            fullName={msg.sender.fullName}
            message={msg.message}
            userImg={msg?.sender.image}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatList
