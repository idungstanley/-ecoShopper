import React, { SetStateAction } from 'react'
import { LuLayoutDashboard, LuPowerOff } from 'react-icons/lu'
import { FaSignal } from 'react-icons/fa'
import { MdContactSupport } from 'react-icons/md'
import { BiCopy } from 'react-icons/bi'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from '@/auth'
import {
  Avatar,
  Badge,
  Box,
  Code,
  Flex,
  Heading,
  HoverCard,
  IconButton,
  Link,
  Separator,
} from '@radix-ui/themes'
import { useAppSelector } from '@/app/redux/store'
import Logout from '../../lib/Logout'

export const Menus = [
  { title: 'Dashboard', src: LuLayoutDashboard, route: '/dashboard' },
  { route: '/route-planner', title: 'Route Planner', src: FaSignal },
  { route: '/report', title: 'Report', src: MdContactSupport, gap: true },
]

const SidebarMenu = ({
  setOpen,
  open,
}: {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}) => {
  const currentRoute = usePathname()
  const router = useRouter()
  const { self } = useAppSelector((state) => state.auth)

  const handleClick = (item: string) => {
    if (item === '/logout') {
      signOut()
      router.push('/auth/login')
    } else {
      router.push(item)
    }
  }

  return (
    <div className="text-white duration-300 z-[900] w-full flex flex-col gap-2">
      <Flex gap="4" align="center" justify="center">
        <Avatar color="green" fallback={self?.user.fullName[0] as string} />
        <Flex direction="column">
          <HoverCard.Root>
            <HoverCard.Trigger>
              <p className="text-[14px]">{self?.user.fullName}</p>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px">
              <Flex gap="4" direction="column">
                <Flex align="center" gap="2">
                  <Avatar
                    size="3"
                    color="green"
                    radius="full"
                    fallback={self?.user.fullName[0] as string}
                  />
                  <Heading size="3" as="h3">
                    {self?.user.fullName}
                  </Heading>
                </Flex>
                <Box>
                  <Badge color="jade" variant="soft" radius="full">
                    {self?.user.role}
                  </Badge>
                  <Flex align="center" gap="2">
                    <Code variant="ghost">{self?.user.id}</Code>
                    <IconButton
                      size="1"
                      aria-label="Copy value"
                      color="gray"
                      variant="ghost"
                    >
                      <BiCopy />
                    </IconButton>
                  </Flex>
                </Box>
              </Flex>
            </HoverCard.Content>
          </HoverCard.Root>
          <Link size="2" href={`mailto:${self?.user.email}`}>
            {self?.user.email}
          </Link>
        </Flex>
      </Flex>
      <Separator orientation="horizontal" color="green" size="4" />
      <ul className="h-full">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex p-2 ${
              !open && 'justify-center'
            } cursor-pointer hover:bg-white hover:text-gray-500 ${
              !open ? 'h-8 w-8 rounded-md' : 'rounded-md'
            }  text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${
              currentRoute === Menu.route
                ? 'bg-white text-gray-500'
                : 'text-white'
            } `}
            onClick={() => handleClick(Menu.route)}
          >
            <Menu.src />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
        <Logout />
      </ul>
    </div>
  )
}

export default SidebarMenu
