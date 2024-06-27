import { useGetSelf } from '@/app/features/auth/authService'
import React from 'react'

const page = () => {
  const { data } = useGetSelf()
  console.log(data)
  return <div></div>
}

export default page
