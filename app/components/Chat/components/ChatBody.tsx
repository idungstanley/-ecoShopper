'use client'
import React from 'react'
import { BsChatSquareText } from 'react-icons/bs'
import MessageTemplate from './MessageTemplate'
interface ChatBodyProps {
  reversedMessage: {
    sender: {
      fullName: string
      image: string
    }
    message: string
  }[]
  setShowEmojiModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatBody = ({
    reversedMessage,
  setShowEmojiModal,
}: ChatBodyProps) => {
  if (!reversedMessage || reversedMessage.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 text-center">
        <BsChatSquareText size={100} />
        <p>Viewers’ comments will show up here.</p>
      </div>
    )
  }
  return (
    <div className="flex-col items-start justify-start hidden w-full h-[600px] p-4 overflow-y-auto text-center lg:flex grow">
      <div className="flex flex-col items-start justify-start w-full p-2">
        {reversedMessage.map((msg, index) => (
          <MessageTemplate
            key={index}
            firstname={msg.sender.fullName}
            message={msg.message}
            userImg={msg?.sender.image}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatBody
