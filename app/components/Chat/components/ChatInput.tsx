'use client'
import React from 'react'
import { IoSend } from 'react-icons/io5'
import { NewEmojiPicker } from '../../EmojiPicker'
import { Flex } from '@radix-ui/themes'
import Image from 'next/image'
import { ImSmile2 } from 'react-icons/im'

interface ChatInputProps {
  value: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (value: string) => void
  isFriendsOnly: boolean
  showemojimodal: boolean
  setShowEmojiModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatInput = ({
  value,
  onSubmit,
  onChange,
  showemojimodal,
  setShowEmojiModal,
}: ChatInputProps) => {
  const displayEmojiModal = (e: any) => {
    setShowEmojiModal((prev) => !prev)
    console.log(e.clientX)
    console.log(e.clientY)
  }

  const setEmoji = (emoji: any, e: MouseEvent) => {
    e.stopPropagation()
    onChange(value + emoji.emoji)
  }
  return (
    <form
      className="relative flex items-center w-full p-4 border-t border-gray-200"
      onSubmit={onSubmit}
    >
      <div className="flex items-center relative w-full">
        <div className="absolute flex items-center justify-center left-3">
          <ImSmile2 onClick={displayEmojiModal} className='text-[20px]' />
        </div>
        <input
          id="search-bar"
          onChange={(e: any) => onChange(e.target.value)}
          value={value}
          placeholder="what are your thoughts?"
          name="q"
          className="flex-1 w-full px-12 py-2 text-gray-600 bg-[#f4f4f4] rounded-md outline-none border-none"
        />
        <Flex
          position="absolute"
          right="13.24px"
          align="center"
          className="cursor-pointer"
          justify="center"
          onClick={() => ({})}
        >
          <button type="submit">
            <IoSend className="text-[25px] hover:text-gray-600" />
          </button>
        </Flex>
      </div>
      <div className="">
        {showemojimodal ? (
          <NewEmojiPicker
            toggleEmojiState={setShowEmojiModal}
            width={500}
            openEmoji={showemojimodal}
            position="-top-[450px] -left-[100px]"
            height={400}
            onEmojiSelect={setEmoji}
            onClick={() => setShowEmojiModal(false)}
          />
        ) : null}
      </div>
    </form>
  )
}

export default ChatInput
