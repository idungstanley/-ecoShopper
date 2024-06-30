'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginButtonProps {
  children: React.ReactNode
  asChild?: boolean
  mode?: 'redirect' | 'modal'
  route: string
}

const RouteButton = ({
  children,
  asChild,
  mode = 'redirect',
  route,
}: LoginButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push(route)
  }

  if (mode === 'modal') {
    return <span>Modal shows here</span>
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  )
}

export default RouteButton
