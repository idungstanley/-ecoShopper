import {
  getMessagesInChat,
  setSelectedChatId,
} from '@/app/features/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import React, { useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useClickAway } from 'react-use'
import MultiSelectDropdown from '../../MultiSelectDropdown'
import { Button } from '@radix-ui/themes'
import { UserProps } from '@/app/features/auth/auth.interface'
import { useAddUserToChat } from '@/app/features/chat/chatService'
import { ChatProps } from '@/app/features/chat/chat.interface'

const SelectedChatHeader = ({ chatInfo }: { chatInfo?: ChatProps }) => {
  const dispatch = useAppDispatch()
  const ref = useRef(null)
  const { mutateAsync } = useAddUserToChat()
  const { users } = useAppSelector((state) => state.auth)

  const [showUsers, setShowUsers] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<UserProps[]>([])

  useClickAway(ref, () => setShowUsers(false))

  const handleCollapse = () => {
    dispatch(setSelectedChatId(null))
    dispatch(getMessagesInChat(null))
  }

  const handleAddUsers = async () => {
    await mutateAsync({
      chatId: chatInfo?._id as string,
      userToBeAddedId: selectedOptions.map((item) => item.id),
    })
  }

  const activeChatUserIds = chatInfo?.members.map((item) => item.id)
  const filterOutExistingUser = users.filter((item) =>
    !activeChatUserIds?.includes(item.id),
  )

  return (
    <div className="relative px-3 flex items-center justify-between w-full min-h-[70px] border-b border-gray-300">
      <span
        className="text-[20px] text-gray-600 hover:cursor-pointer hover:text-black"
        onClick={handleCollapse}
      >
        <IoMdArrowRoundBack />
      </span>
      <div
        className={`text-xl my-3 relative ${
          chatInfo?.name ? 'font-extrabold text-gray-600' : 'font-normal'
        }`}
      >
        {chatInfo?.name}
      </div>
      <span
        className="text-[20px] text-gray-600 hover:cursor-pointer hover:text-black"
        onClick={() => setShowUsers((prev) => !prev)}
      >
        <BsThreeDotsVertical />
      </span>

      {showUsers && (
        <div
          ref={ref}
          className="rounded-md border border-gray-200 bg-white absolute top-14 right-0 p-4"
        >
          <MultiSelectDropdown
            setSelectedOptions={setSelectedOptions}
            selectedOptions={selectedOptions}
            formFieldName={'users'}
            options={filterOutExistingUser}
            onChange={(selectedUsers) => {
              console.log('selectedUsers', selectedUsers)
            }}
          />
          <Button
            className="bg-blue-600 hover:bg-blue-800 w-full"
            disabled={selectedOptions.length === 0}
            onClick={handleAddUsers}
          >
            Add user
          </Button>
        </div>
      )}
    </div>
  )
}

export default SelectedChatHeader
