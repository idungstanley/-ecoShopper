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
import { Theme, ThemePanel } from '@radix-ui/themes'

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
          <Theme>
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full h-screen">
                  <PacmanLoader color="#1c5754" />
                </div>
              }
            >
              {children}
              {/* <ThemePanel /> */}
            </Suspense>
          </Theme>
          <ToastContainer position="top-right" />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
