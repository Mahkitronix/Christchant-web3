import MainHeader from '@/components/layouts/main/MainHeader'
import MainFooter from '@/components/layouts/main/MainFooter'

import { selectDarkMode } from '@/store/slices/ui.slice'
import { useSelector } from 'react-redux'
import { ReactNode } from 'react'
import Head from 'next/head'

interface MainLayoutProps {
  pageTitle: string | null
  children: ReactNode
}

export default function MainLayout({ pageTitle, children }: MainLayoutProps) {
  const isDarkMode = useSelector(selectDarkMode)

  return (
    <>
      <Head>
        <title>
          {pageTitle} | {process.env.APP_NAME}
        </title>
      </Head>
      <div
        className={`h-screen bg-black ${isDarkMode ? 'dark' : ''} scrollbar-thin space-y-1 overflow-y-auto scroll-smooth transition-all duration-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:hover:bg-gray-800 [&::-webkit-scrollbar-track]:bg-gray-500 [&::-webkit-scrollbar]:w-1 ${isDarkMode ? 'dark' : ''}`}
      >
        <MainHeader />
        {children}
        <MainFooter />
      </div>
    </>
  )
}
