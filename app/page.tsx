import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import RouteButton from './components/auth/LoginButton'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})
export default function Home() {
  
  return (
    <main className="items-center text-white justify-center bg-gradient-to-r from-gray-800 to-red-200 flex h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className={cn('font-bold text-[35px]', font.className)}>
          👽 Outpost
        </h1>
        <p>Citizen Safety and Resource Tracker with Safe Route Planner</p>
        <div className="flex items-center gap-4">
          <RouteButton route='auth/signup'>
            <Button variant="secondary">Sign up</Button>
          </RouteButton>
          <RouteButton route='auth/login'>
            <Button>Login</Button>
          </RouteButton>
        </div>
      </div>
    </main>
  )
}
