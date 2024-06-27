'use client'
import Input from '@/app/components/inputs/Input'
import { SigninValidationProps } from '@/app/types'
import { signinSchema } from '@/app/validationSchema'
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginPage = () => {
  //local state
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signinSchema,
    validateOnBlur: true,
    onSubmit: async (values: SigninValidationProps) => {
      console.log('stan')
      try {
        await signIn('credentials', {
          password: values.password,
          email: values.email,
          redirect: true,
          callbackUrl: '/dashboard'
        })
      } catch (error) {
        console.log(error)
      }
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div
      className="bg-no-repeat bg-cover items-center text-gray-700 justify-center bg-gradient-to-r from-gray-800 to-red-200 flex h-screen flex-col space-y-2 w-full"
      style={{ backgroundImage: "url('/space-ship.jpg')" }}
    >
      <div className="items-center justify-center flex h-fit p-6 rounded-md flex-col space-y-4 w-1/4 bg-white">
        <header className="text-[20px] font-extrabold">
          <h1>👽 Welcome Back 👽</h1>
        </header>

        <p className="text-center border-2 border-red-200 rounded p-2 bg-gray-800 text-white">
          Join Our Citizen Safety and Resource Tracker App, Fill in the details
          below and let us guide you to safety as you journey with us
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex items-center justify-center flex-col w-full space-y-4"
        >
          <Input
            label="Email"
            onChange={formik.handleChange}
            placeholder="your-email@example.com"
            value={formik.values.email}
            name="email"
            type="email"
            height="h-10"
          />
          <Input
            label="Password"
            height="h-10"
            trailingIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            trailingClick={togglePasswordVisibility}
            value={formik.values.password}
            onChange={formik.handleChange}
            isError={!!formik.errors.password && !!formik.touched.password}
            onBlur={formik.handleBlur}
          />
        <Button className="w-full bg-gray-800" type="submit">
          Login
        </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
