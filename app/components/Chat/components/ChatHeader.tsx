'use client'
import { setBacktoChatList } from '@/app/features/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import React, { useRef, useState } from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Box, TextField } from '@radix-ui/themes'
import { CiSearch } from 'react-icons/ci'
import { BsThreeDots } from 'react-icons/bs'
import MultiSelectDropdown from '../../MultiSelectDropdown'
import { useClickAway } from 'react-use'
import { UserProps } from '@/app/features/auth/auth.interface'
import { Button } from '@/components/ui/button'
import { useCreateChat } from '@/app/features/chat/chatService'

const ChatHeader = () => {
  const dispatch = useAppDispatch()
  const { users, self } = useAppSelector((state) => state.auth)
  const [chatName, setChatName] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<UserProps[]>([])
  const { mutateAsync } = useCreateChat()
  const [showUsers, setShowUsers] = useState(false)

  const ref = useRef(null)
  useClickAway(ref, () => setShowUsers(false))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setChatName(value)
  }

  const handleCollapse = () => {
    dispatch(setBacktoChatList(true))
  }

  const handleCreateChat = async () => {
    await mutateAsync({
      name: chatName,
      members: [...selectedOptions.map((item) => item.id), self?.user.id as string],
    })
    setChatName('')
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
        <div className="relative">
          <FaCirclePlus
            onClick={() => setShowUsers((prev) => !prev)}
            className="cursor-pointer"
          />
          {showUsers && (
            <div
              ref={ref}
              className="rounded-md border border-gray-200 bg-white absolute top-3 right-0 p-4"
            >
              <MultiSelectDropdown
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
                formFieldName={'chat'}
                options={users}
                onChange={(selectedUsers) => {
                  console.log('selectedUsers', selectedUsers)
                }}
              />
              <TextField.Root
                placeholder="Enter chat name"
                size="2"
                className="my-2"
                value={chatName}
                onChange={handleChange}
              />
              <Button
                className="bg-blue-600 hover:bg-blue-800 w-full"
                disabled={!chatName || selectedOptions.length === 0}
                onClick={handleCreateChat}
              >
                Create chat
              </Button>
            </div>
          )}
        </div>
      </div>
      <Box className="w-full">
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
