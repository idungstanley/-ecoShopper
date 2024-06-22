'use client'
import Input from '@/app/components/inputs/Input'
import { useCreateUser } from '@/app/features/auth/authService'
import { SignupValidationProps } from '@/app/types'
import { signupSchema } from '@/app/validationSchema'
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const SignupPage = () => {
  //external hooks
  const { mutateAsync } = useCreateUser()
  const router = useRouter()

  //local state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
    validationSchema: signupSchema,
    validateOnBlur: true,
    onSubmit: async (values: SignupValidationProps) => {
      try {
        await mutateAsync({
          fullName: values.fullName,
          password: values.password,
          email: values.email,
        })
        await signIn('credentials', {
          password: values.password,
          email: values.email,
        })
        router.push('/dashboard')
      } catch (error) {
        console.log(error)
      }
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState)
  }
  return (
    <div
      className="bg-no-repeat bg-cover items-center text-gray-700 justify-center bg-gradient-to-r from-gray-800 to-red-200 flex h-full flex-col space-y-2 w-full"
      style={{ backgroundImage: "url('/space-ship.jpg')" }}
    >
      <div className="items-center justify-center flex h-fit p-6 rounded-md flex-col space-y-4 w-1/4 bg-white">
        <header className="text-[20px] font-extrabold">
          <h1>👽 Register with us 👽</h1>
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
            label="Full Name"
            onChange={formik.handleChange}
            placeholder="Full name"
            value={formik.values.fullName}
            name="fullName"
            type="text"
            height="h-10"
            bgColor="bg-transparent"
          />
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
          <Input
            label="Confirm password"
            height="h-12"
            trailingIcon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            trailingClick={toggleConfirmPasswordVisibility}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            isError={
              !!formik.errors.confirmPassword &&
              !!formik.touched.confirmPassword
            }
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.confirmPassword}
          />
          <Button className="w-full bg-gray-800" type="submit">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
