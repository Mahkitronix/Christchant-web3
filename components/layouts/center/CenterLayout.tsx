import { useDispatch, useSelector } from 'react-redux'
import { ReactNode, useState, useEffect } from 'react'
import { AdminMenuItem } from '@/types/layout'
import CenterSidebar from './CenterSidebar'
import CenterHeader from './CenterHeader'
import { useRouter } from 'next/router'
import CenterContent from './CenterContent'
import {
  setSidebarCollapsed,
  selectSidebarCollapsed,
  selectDarkMode,
} from '@/store/slices/ui.slice'
import Head from 'next/head'

interface CenterLayoutProps {
  pageTitle: string | null
  withPageTitle?: boolean
  menuItems: Array<AdminMenuItem>
  children: ReactNode
  breadcrumbs?: { link?: string; label: string }[]
  pageDescription?: string
  backLink?: string
}

export default function CenterLayout({
  pageTitle,
  pageDescription,
  withPageTitle = true,
  menuItems,
  children,
  breadcrumbs = [],
  backLink,
}: CenterLayoutProps) {
  const dispatch = useDispatch()
  const isSidebarOpen = !useSelector(selectSidebarCollapsed)
  const [localIsSidebarOpen, setIsSidebarOpen] = useState(isSidebarOpen)
  const isDarkMode = useSelector(selectDarkMode)
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    if (breadcrumbs?.length > 0) {
      setCurrentPage(breadcrumbs[breadcrumbs.length - 1]?.link || 'dashboard')
    }
  }, [breadcrumbs])

  const router = useRouter()

  const handleRouteChange = (link: string) => {
    setCurrentPage(link)
    router.push(`/center/${link}`)
  }

  return (
    <>
      <Head>
        <title>
          {pageTitle} | {process.env.APP_NAME}
        </title>
      </Head>

      <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
        <CenterSidebar
          isOpen={localIsSidebarOpen}
          onClose={() => {
            setIsSidebarOpen(false)
            dispatch(setSidebarCollapsed(true))
          }}
          onOpen={() => {
            setIsSidebarOpen(true)
            dispatch(setSidebarCollapsed(false))
          }}
          className={localIsSidebarOpen ? '' : 'animate-slide-out'}
          menuItems={menuItems}
        />

        <div
          className={`flex flex-1 flex-col pl-2 ${localIsSidebarOpen ? '' : 'animate-slide-out'}`}
        >
          <CenterHeader />

          <CenterContent
            breadcrumbs={breadcrumbs}
            handleRouteChange={handleRouteChange}
            pageTitle={pageTitle}
            withPageTitle={withPageTitle}
            pageDescription={pageDescription}
            backLink={backLink}
            currentPage={currentPage}
          >
            {children}
          </CenterContent>
        </div>
      </div>
    </>
  )
}
