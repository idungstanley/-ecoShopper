import React, { useCallback, useEffect, useState } from 'react'
import ChatBody from './components/ChatBody'
import ChatInput from './components/ChatInput'
import SelectedChatHeader from './components/ChatNav'
import ChatHeader from './components/ChatHeader'
import ChatList from './components/ChatList'
import { useAppSelector } from '@/app/redux/store'
import {
  useGetChats,
  useGetMessagesInChat,
} from '@/app/features/chat/chatService'
import { MessagesInChatProps } from '@/app/features/chat/chat.interface'
import socket from '@/app/utils/socket'

const Chat = () => {
  const { isLoading: isChatsLoading } = useGetChats()

  const { selectedChatId, chats, messagesInChat } = useAppSelector(
    (state) => state.chat,
  )

  const { isLoading, data } = useGetMessagesInChat(selectedChatId as string)

  const { self } = useAppSelector((state) => state.auth)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(
    messagesInChat as MessagesInChatProps[],
  )
  const [showemojimodal, setShowEmojiModal] = useState(false)

  const chatTitle = chats.find((item) => item._id === selectedChatId)

  useEffect(() => {
    setMessages(messagesInChat as MessagesInChatProps[])
    socket.emit('joinChat', selectedChatId)
    socket.on('receiveMessage', (message: MessagesInChatProps) => {
      setMessages((prev) => [...prev, message])
    })
    return () => {
      socket.off('receiveMessage')
    }
  }, [selectedChatId, data, messagesInChat])

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('sendMessage', {
      content: message,
      senderId: self?.user.id,
      chatId: selectedChatId,
    })
    setMessage('')
  }

  console.log('messages: ', messages)

  const joinChatOverSocket = useCallback(() => {
    socket.emit('joinChat', { chatId: selectedChatId })
  }, [selectedChatId])

  return (
    <div className="bg-white z-[9999] border border-gray-100 rounded-md fixed bottom-24 right-4 h-[740px] lg:w-[400px] w-full">
      {!selectedChatId && (
        <>
          <ChatHeader />
          <ChatList
            isChatsLoading={isChatsLoading}
            joinChat={joinChatOverSocket}
            chats={chats}
          />
        </>
      )}
      {selectedChatId && (
        <>
          <SelectedChatHeader chatInfo={chatTitle} />
          <ChatBody messages={messages} isMessagesLoading={isLoading} />
          <ChatInput
            setShowEmojiModal={setShowEmojiModal}
            showemojimodal={showemojimodal}
            value={message}
            onChange={setMessage}
            isFriendsOnly
            onSubmit={handleSendMessage}
          />
        </>
      )}
    </div>
  )
}

export default Chat
