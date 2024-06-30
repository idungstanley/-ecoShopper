'use client'
import React from 'react'
import { BsChatSquareText } from 'react-icons/bs'
import MessageTemplate from './MessageTemplate'
import { MessagesInChatProps } from '@/app/features/chat/chat.interface'
import { ClipLoader } from 'react-spinners';

const ChatBody = ({
  messages,
  isMessagesLoading,
}: {
  messages: MessagesInChatProps[] | null
  isMessagesLoading: boolean
}) => {
  if (isMessagesLoading || !messages ) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ClipLoader />
      </div>
    )
  }
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-4 text-center">
        <BsChatSquareText size={100} />
        <p>Start a conversation. . .</p>
      </div>
    )
  }

  return (
    <div className="flex-col items-start justify-start hidden w-full h-[600px] p-4 overflow-y-auto text-center lg:flex grow">
      <div className="flex flex-col w-full p-2">
        {messages.map((msg, index) => (
          <MessageTemplate
            key={index}
            message={msg.content}
            userInfo={{
              id: msg.sender,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatBody
