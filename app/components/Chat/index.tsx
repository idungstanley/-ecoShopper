import React, { useState } from 'react'
import ChatBody from './components/ChatBody'
import ChatInput from './components/ChatInput'
import { useSession } from 'next-auth/react'
import SelectedChatHeader from './components/ChatNav'
import ChatHeader from './components/ChatHeader'
import ChatList from './components/ChatList'
import { useAppSelector } from '@/app/redux/store'

const reversedMessage = [
  {
    id: '1',
    sender: {
      fullName: 'Stanley Sunday',
      image: '/space-ship.jpg',
    },
    message: 'I want to go home, please help me escape',
  },
  {
    id: '2',
    sender: {
      fullName: 'Nich diamond',
      image: '/home-locations.png',
    },
    message: 'okay',
  },
  {
    id: '3',
    sender: {
      fullName: 'Blessing',
      image: '/hospital.png',
    },
    message: 'Nah, please help me check',
  },
  {
    id: '4',
    sender: {
      fullName: 'Ugo',
      image: '/home-locations.png',
    },
    message: 'Sure',
  },
  {
    id: '5',
    sender: {
      fullName: 'Adams Talstrike',
      image: '/hospital.png',
    },
    message: 'I will look into it now.',
  },
  {
    id: '6',
    sender: {
      fullName: 'Daniel bro',
      image: '/food-location.png',
    },
    message: 'You no dey reply chat again ni. . .',
  },
  {
    id: '7',
    sender: {
      fullName: 'stanley',
      image: '/food-location.png',
    },
    message: 'I want to go home, please help me escape',
  },
  {
    id: '8',
    sender: {
      fullName: 'stanley',
      image: '/home-locations.png',
    },
    message: 'I want to go home, please help me escape',
  },
]

const Chat = () => {
  const { selectedChatId } = useAppSelector((state) => state.chat)
  const [comment, setComment] = useState('')
  const [showemojimodal, setShowEmojiModal] = useState(false)

  const displayEmojiModal = (e: any) => {
    setShowEmojiModal(true)
    console.log(e.clientX)
    console.log(e.clientY)
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setComment('')
  }
  return (
    <div className="bg-white z-[9999] border border-gray-100 rounded-md fixed bottom-24 right-4 max-h-[740px] w-[400px]">
      {!selectedChatId && (
        <>
          <ChatHeader />
          <ChatList
            reversedMessage={reversedMessage}
            setShowEmojiModal={setShowEmojiModal}
          />
        </>
      )}
      {selectedChatId && (
        <>
          <SelectedChatHeader
            commentCount={reversedMessage?.length}
            isCommentMade={reversedMessage?.length > 0}
          />
          <ChatBody
            reversedMessage={reversedMessage}
            setShowEmojiModal={setShowEmojiModal}
          />
          <ChatInput
            setShowEmojiModal={setShowEmojiModal}
            showemojimodal={showemojimodal}
            value={comment}
            onChange={setComment}
            isFriendsOnly
            onSubmit={handleSendMessage}
          />
        </>
      )}
    </div>
  )
}

export default Chat
