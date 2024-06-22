'use client'
import { Provider } from 'react-redux'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'
import { store } from './store'
import { ErrorResponse, ISuccessRequest } from '../types'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Notify from '@/lib/Notify'
import { PacmanLoader } from 'react-spinners'

export function Providers({ children }: React.PropsWithChildren) {
  const onError = (error: unknown): unknown => {
    const typedError = error as ErrorResponse
    let title: string
    console.log(typedError.data.error, 'error')

    if (!error) {
      title = 'Oops! An internal server error occurred.'
      Notify({ type: 'errror', text: title })
      return
    }

    // if (typedError.status === 422) {
    //   title = typedError.data.error
    // } else if (typedError?.data.error) {
    //   title = typedError?.data.error
    // } else if (typedError.status === 403) {
    //   title = 'Oops! You are not authorized to perform this action.'
    // } else if (typedError.status === 401) {
    //   title = 'Oops! You are no longer authenticated!'
    // } else if (typedError.status === 500 || !typedError) {
    //   title = 'Oops! An internal server error occurred.'
    // } else if (typedError.status === 404) {
    //   title = 'Oops! Reservation not found.'
    // } else {
    //   title =
    //     (typedError.data.error as string) ||
    //     typedError?.statusText ||
    //     typedError.data.error
    // }
    Notify({ type: 'error', text: typedError.data.error })
  }

  const onSuccess = (data: unknown): unknown => {
    let title: string
    const typedSuccess = data as ISuccessRequest

    if (!typedSuccess?.message) {
      return
    }

    if (typedSuccess?.message) {
      title = typedSuccess?.message
    } else {
      title = 'Success'
    }
    Notify({ type: 'success', text: title })
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
    mutationCache: new MutationCache({
      onError,
      onSuccess,
    }),
    queryCache: new QueryCache({
      onError,
      onSuccess,
    }),
  })
  const [client] = React.useState(queryClient)

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center w-full h-screen">
                <PacmanLoader color="#36d7b7" />
              </div>
            }
          >
            {children}
          </Suspense>
          <ToastContainer position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
