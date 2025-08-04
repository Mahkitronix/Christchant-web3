import { toggleDarkMode, selectDarkMode } from '@/store/slices/ui.slice'
import { IconBell, IconLogout, IconSearch } from '@tabler/icons-react'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useUserAuth } from '@/hooks/useUserAuth'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
} from '@heroui/react'
import { useEffect } from 'react'

export default function CenterHeader() {
  const { user, logout } = useUserAuth({
    redirectTo: '/center/login',
  })

  const dispatch = useDispatch()
  const isDarkMode = useSelector(selectDarkMode) // Get dark mode state from Redux

  const handleLogout = async () => {
    await logout()
  }

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode()) // Dispatch the toggle action
    const newDarkModeState = !isDarkMode
    document.documentElement.classList.toggle('dark', newDarkModeState) // Update the class on the document
    localStorage.setItem('darkMode', JSON.stringify(newDarkModeState)) // Save the new state to localStorage
  }

  // Load dark mode state on component mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode')
    if (storedDarkMode) {
      const isDark = JSON.parse(storedDarkMode)
      document.documentElement.classList.toggle('dark', isDark) // Apply the class based on stored value
    }
  }, [])

  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 dark:border-none">
      <div className="flex h-16 items-center justify-between gap-4 px-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-4">
          {/* Search */}
          <div className="relative hidden flex-1 lg:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <IconSearch
                className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                stroke={1.5}
              />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className={`w-full max-w-md rounded-xl border-none ${isDarkMode ? 'text-white' : 'text-gray-900'} py-2 pl-10 pr-4 focus:outline-none`}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="relative rounded-xl p-2 text-gray-600 transition duration-200 ease-in-out hover:bg-gray-200">
                <Badge
                  content="0"
                  color="primary"
                  size="sm"
                  className="absolute -right-1 -top-1"
                >
                  <IconBell size={20} stroke={1.5} />
                </Badge>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Notifications" className="w-80">
              <DropdownItem key="new_order" description="30 minutes ago">
                New order received
              </DropdownItem>
              <DropdownItem key="product_review" description="1 hour ago">
                New product review
              </DropdownItem>
              <DropdownItem key="view_all" className="text-primary">
                View all notifications
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleToggleDarkMode}
            className="flex items-center rounded-xl p-2 text-gray-600 transition duration-200 ease-in-out hover:bg-gray-200"
          >
            {isDarkMode ? (
              <>
                <IconSun size={20} stroke={1.5} className="mr-1" />
                Light Mode
              </>
            ) : (
              <>
                <IconMoon size={20} stroke={1.5} className="mr-1" />
                Dark Mode
              </>
            )}
          </button>

          {/* User Menu */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="flex items-center gap-2 rounded-xl p-1 transition duration-200 ease-in-out hover:bg-gray-200">
                <Avatar
                  name={user?.firstName || 'S'}
                  size="sm"
                  className="transition-transform"
                />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<IconLogout size={18} stroke={1.5} />}
                onClick={handleLogout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
