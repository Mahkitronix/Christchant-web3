import MainLogo from '@/components/_sharable/logos/MainLogo'
import Style from '@/styles/main/layout/header.module.css'
import MainContainer from './MainContainer'
import router from 'next/router'
import Link from 'next/link'
import DropdownItems from './dropdown/DropDownItems'
import MobileMenu from './dropdown/mobile-menu/index'

const links = [
  {
    id: 1,
    label: 'Tutorials',
    link: '/artist/anel',
  },
  {
    id: 2,
    label: 'Songs',
    link: '/artist/anel',
  },
  {
    id: 3,
    label: 'Product',
    link: '/artist/anel',
  },
  {
    id: 4,
    label: 'Pricing',
    link: '/pricing',
  },
]

export default function MainHeader() {
  return (
    <>
      <header
        className={`${Style.header} fixed z-50 shadow-md text-white py-2.5 dark:border-none`}
      >
        <div className="fixed w-full h-12 top-0 left-0 bg-gradient-to-b from-[#0000] to-[#153636] backdrop-filter backdrop-blur"></div>
        <MainContainer className="flex justify-between items-center  ">
          <div className="relative flex items-center space-x-4 gap-2">
            <MainLogo
              onClick={() => router.push('/')}
              className="mt-1"
              isFull={true}
              width={125}
              height={50}
            />
            <DropdownItems />
            {links.map((item: any) => {
              return (
                <Link
                  className="hover:text-blue-500 transition duration-200"
                  key={item.id}
                  href={item.link}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="">
            <div className="flex space-x-4 fixed sm:sticky  flex-col sm:flex sm:flex-row sm:items-center sm:flex hidden ">
              <button className="">Download</button>
              <Link
                className="hover:text-blue-500 transition duration-200"
                href="/signin"
              >
                Sign In
              </Link>
            </div>
            <MobileMenu />
          </div>
        </MainContainer>
      </header>
    </>
  )
}
