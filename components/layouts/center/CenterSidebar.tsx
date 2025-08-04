import MainLogo from '@/components/_sharable/logos/MainLogo'
import UiTooltip from '@/components/_sharable/UiTooltip'
import { useDispatch, useSelector } from 'react-redux'
import { AdminMenuItem } from '@/types/layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  toggleSidebar,
  setSidebarCollapsed,
  selectSidebarCollapsed,
  selectDarkMode,
} from '@/store/slices/ui.slice'
import {
  IconSettings,
  IconUser,
  IconArrowBarLeft,
  IconChevronDown,
  IconArrowBarRight,
} from '@tabler/icons-react'
import Link from 'next/link'

interface SidebarProps {
  className?: string
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  menuItems: AdminMenuItem[]
}

const bottomMenuItems = [
  { icon: IconSettings, label: 'Settings', href: '/center/account/settings' },
  { icon: IconUser, label: 'Profile', href: '/center/account/profile' },
]

export default function CenterSidebar({
  className = '',
  isOpen,
  onClose,
  onOpen,
  menuItems,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const dispatch = useDispatch()
  const isCollapsed = useSelector(selectSidebarCollapsed)
  const isDarkMode = useSelector(selectDarkMode) // Get dark mode state from Redux
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  // Load initial state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('sidebarCollapsed')
    if (stored !== null) {
      dispatch(setSidebarCollapsed(JSON.parse(stored)))
    }
  }, [dispatch])

  useEffect(() => {
    const activeItems = menuItems
      .filter((item) => {
        const isActive =
          router.pathname === item.href ||
          item.subItems?.some((subItem) => router.pathname === subItem.href)
        return isActive
      })
      .map((item) => item.href)
      .filter((href): href is string => href !== undefined)
    setExpandedItems(activeItems)
  }, [menuItems, router.pathname])

  const handleCollapse = () => {
    dispatch(toggleSidebar())
    onOpen()
  }

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    )
  }

  return (
    <div
      className={`${
        !isOpen ? 'w-[64px] translate-x-0' : 'w-64'
      } sticky inset-y-0 left-0 top-0 z-20 z-30 transform ${isDarkMode ? 'dark' : 'bg-white'} transition-transform duration-300 ease-in-out lg:static ${className} ${isOpen ? '' : 'animate-slide-out'}`}
    >
      <div className="flex h-full flex-col">
        <div
          className={`flex h-16 items-center justify-between p-4 ${isHovered ? 'animate-fade-in opacity-90' : 'opacity-100'}`}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <>
              {!isOpen && (
                <IconArrowBarRight
                  onClick={() => {
                    setIsHovered(false)
                    onOpen()
                  }}
                  size={24}
                  className="cursor-pointer opacity-90"
                />
              )}
            </>
          ) : (
            <div className="flex items-center gap-2 text-xl font-bold">
              {!isOpen ? (
                <MainLogo onMouseEnter={() => setIsHovered(true)} />
              ) : (
                <MainLogo width={22} />
              )}
              {!isOpen ? (
                ''
              ) : (
                <div className="text-xxl font-bold">{process.env.APP_NAME}</div>
              )}
              {!isOpen ? (
                ''
              ) : (
                <IconArrowBarLeft
                  onClick={onClose}
                  size={18}
                  className="float-right ml-11 cursor-pointer opacity-80 hover:opacity-70"
                />
              )}
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col justify-between overflow-hidden py-4">
          <ul className="scrollbar-thin space-y-1 overflow-y-auto scroll-smooth transition-all duration-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
            {menuItems.map((item, index) => {
              if (item.type === 'divider') {
                return !isCollapsed ? (
                  <li key={`divider-${index}`} className="pb-2 pt-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-[1px] flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      ></div>
                      <span
                        className={`text-xs font-thin uppercase ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} text-left`}
                      >
                        {item.label}
                      </span>
                      <div
                        className={`h-[1px] flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      ></div>
                    </div>
                  </li>
                ) : (
                  <li key={`divider-${index}`} className="pb-2 pt-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-[1px] flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      ></div>
                    </div>
                  </li>
                )
              }

              const Icon = item.icon
              const isActive =
                router.pathname === item.href ||
                item.subItems?.some(
                  (subItem) => router.pathname === subItem.href
                )
              const hasSubItems = item?.subItems?.length || 0 > 0

              return (
                <li key={item.href || `item-${index}`}>
                  {isCollapsed ? (
                    <UiTooltip label={item.label}>
                      <div>
                        <div
                          onClick={handleCollapse}
                          className={`flex h-10 cursor-pointer items-center justify-center transition-colors ${
                            isActive
                              ? 'bg-primary/10 border-l-3 border-primary text-primary'
                              : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                          }`}
                        >
                          <Icon size={20} stroke={1.5} />
                        </div>
                        {hasSubItems && !isCollapsed && (
                          <ul className="mt-1 space-y-1 pl-4">
                            {item.subItems?.map((subItem) => {
                              const SubIcon = subItem.icon
                              const isSubActive =
                                router.pathname === subItem.href
                              return (
                                <UiTooltip
                                  key={subItem.href}
                                  label={subItem.label}
                                >
                                  <div
                                    onClick={() => router.push(subItem.href)}
                                    className={`flex h-8 cursor-pointer items-center justify-center rounded-lg transition-colors ${
                                      isSubActive
                                        ? 'bg-primary/10 text-primary'
                                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                                    }`}
                                  >
                                    <SubIcon size={16} stroke={1.5} />
                                  </div>
                                </UiTooltip>
                              )
                            })}
                          </ul>
                        )}
                      </div>
                    </UiTooltip>
                  ) : (
                    <div>
                      <div
                        className={`flex h-10 cursor-pointer items-center justify-between rounded-lg px-5 transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                        }`}
                        onClick={() =>
                          hasSubItems
                            ? toggleExpanded(item?.href || '')
                            : router.push(item?.href || '')
                        }
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} stroke={1.5} />
                          <span
                            className={`text-sm font-medium transition-opacity duration-300`}
                          >
                            {item.label}
                          </span>
                        </div>
                        {hasSubItems && (
                          <div
                            className={`transform transition-transform duration-300 ${
                              expandedItems.includes(item?.href || '')
                                ? 'rotate-180'
                                : ''
                            }`}
                          >
                            <IconChevronDown size={16} />
                          </div>
                        )}
                      </div>
                      {hasSubItems && (
                        <div
                          className={`overflow-hidden pl-4 transition-all duration-300 ${
                            expandedItems.includes(item?.href || '')
                              ? 'max-h-[500px] opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          <ul
                            className={`mt-1 space-y-1 border-l ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} pl-4`}
                          >
                            {item?.subItems?.map((subItem) => {
                              const SubIcon = subItem.icon
                              const isSubActive =
                                router.pathname === subItem.href
                              return (
                                <li key={subItem.href}>
                                  <Link
                                    href={subItem.href}
                                    className={`flex h-8 items-center gap-3 rounded-lg px-3 transition-colors ${
                                      isSubActive
                                        ? 'bg-primary/10 text-primary'
                                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                                    }`}
                                  >
                                    <SubIcon size={16} stroke={1.5} />
                                    <span className="text-sm font-medium">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Bottom Navigation */}
          <ul className="space-y-1 px-2">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = router.pathname === item?.href || ''
              return (
                <li key={item?.href || ''}>
                  {isCollapsed ? (
                    <UiTooltip label={item.label}>
                      <Link
                        href={item?.href || ''}
                        className={`flex h-10 items-center justify-center rounded-xl transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                        }`}
                      >
                        <Icon size={20} stroke={1.5} />
                      </Link>
                    </UiTooltip>
                  ) : (
                    <Link
                      href={item?.href || ''}
                      className={`flex h-10 items-center gap-3 rounded-xl px-3 transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      <Icon size={20} stroke={1.5} />
                      <span className="text-sm font-medium transition-opacity duration-300">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
