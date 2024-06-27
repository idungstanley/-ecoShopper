import Image from 'next/image'
import React from 'react'

const MessageTemplate = ({
  userImg,
  firstname,
  lastname,
  message,
}: {
  time?: string
  userImg: string
  firstname?: string
  lastname?: string
  message?: string
}) => {
  return (
    <div className="flex items-center w-full gap-2 mb-2">
      <Image
        src={userImg !== null ? userImg : '/profileIcon.svg'}
        alt="author"
        width={40}
        height={40}
        className="object-cover w-[40px] h-[40px] rounded-[50%] border-[2.5px] border-brand-500"
      />
      <div>
        <p className="text-[14px] text-[#525252] font-semibold leading-[21px] text-left">
          {firstname} {lastname}
        </p>
        <div
          className="bg-[#f1f1f1] p-1 px-2 rounded-r-lg rounded-b-lg max-w-[300px]"
        >
          <p className="text-[14px] mt-[9px] text-[#343D45] leading-[179.5%] text-left whitespace-pre-wrap w-full">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessageTemplate
