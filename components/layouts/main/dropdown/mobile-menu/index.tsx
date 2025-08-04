import { useState } from 'react'
import { IconMenuDeep } from '@tabler/icons-react'

const mobileMenuItem = [
  {
    id: 'artist',
    label: 'Songs',
    link: '/artist/anel',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    link: '/pricing',
  },
]

const bgBlack = (isOpen: boolean) =>
  `bg-black top-16 w-full opacity-0 h-screen fixed left-0 z-10 ${
    isOpen ? 'opacity-80 block' : 'opacity-0 hidden'
  }`

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div onClick={() => setIsOpen(false)} className={bgBlack(isOpen)}></div>
      <div className="block sm:hidden">
        <button onClick={toggleMenu}>
          <IconMenuDeep />
        </button>
      </div>
      {isOpen && (
        <div className="fixed left-0 top-12 p-4 w-full bg-white h-auto sm:hidden shadow-lg z-50">
          <div className="flex flex-col space-y-2">
            {mobileMenuItem.map((item) => (
              <div key={item.id} className="p-2 hover:bg-gray-200 rounded">
                <a href={item.link}>{item.label}</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
