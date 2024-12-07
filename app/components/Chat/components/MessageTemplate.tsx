import { useAppSelector } from '@/app/redux/store'
import Image from 'next/image'
import React from 'react'
import { LuCheckCheck } from 'react-icons/lu';

const MessageTemplate = ({
  userImg,
  message,
  userInfo,
}: {
  time?: string
  userImg?: string
  message?: string
  userInfo: {
    id: string
  }
}) => {
  const { self } = useAppSelector((state) => state.auth)
  return (
    <div
      className={`flex items-center w-full gap-2 mb-2 ${
        userInfo.id === self?.user.id ? 'justify-end' : 'justify-start'
      }`}
    >
      {userInfo.id !== self?.user.id && (
        <Image
          src={userImg ? userImg : '/food-location.png'}
          alt="author"
          width={40}
          height={40}
          className="object-cover w-[40px] h-[40px] rounded-[50%] border-[2.5px] border-brand-500"
        />
      )}
      <div>
        <div className="bg-[#f1f1f1] p-1 px-2 rounded-l-lg rounded-t-lg max-w-[300px] flex items-center gap-1">
          <p className="text-[14px] text-[#343D45] leading-[179.5%] text-left whitespace-pre-wrap w-full">
            {message}
          </p>
          <span>
            <LuCheckCheck />
          </span>
        </div>
      </div>
    </div>
  )
}

export default MessageTemplate
