import { setBacktoChatList } from '@/app/features/chat/chatSlice';
import { useAppDispatch } from '@/app/redux/store';
import React from 'react'
import { GoSidebarCollapse } from 'react-icons/go'

const SelectedChatHeader = ({
  isCommentMade,
}: {
  isCommentMade: boolean
  commentCount?: number
}) => {
  const dispatch = useAppDispatch()
  const handleCollapse = () => {
    dispatch(setBacktoChatList(true))
  }
  return (
    <div className="relative hidden lg:flex items-center justify-center w-full min-h-[70px] border-b border-gray-300">
      <span
        className="absolute text-[20px] text-gray-600 left-3 hover:cursor-pointer hover:text-black hover:text-[24px] transition-all ease-in-out"
        onClick={() => handleCollapse()}
      >
        <GoSidebarCollapse />
      </span>
      <div
        className={`text-xl my-3 relative ${
          isCommentMade ? 'font-extrabold text-gray-600' : 'font-normal'
        }`}
      >
        LIVE CHAT
      </div>
    </div>
  )
}

export default SelectedChatHeader
