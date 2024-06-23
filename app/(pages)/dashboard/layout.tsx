import Sidebar from '@/app/components/nav/Sidebar'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import React from 'react'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('flex w-full h-full', font.className)}>
      <Sidebar />
      <div className="flex basis-4/5">{children}</div>
    </div>
  )
}

export default layout
