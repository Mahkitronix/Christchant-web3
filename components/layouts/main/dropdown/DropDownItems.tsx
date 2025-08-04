import { useState } from 'react'
import Search from './contents/Search'
import HelpCenter from './contents/HelpCenter'
import { IconChevronUp } from '@tabler/icons-react'

interface DropdownItem {
  id: string
  label: string
  component: React.ReactNode
}

const dropdownItems: DropdownItem[] = [
  {
    id: 'search',
    label: 'Search',
    component: <Search>ThisIs</Search>,
  },
  {
    id: 'ChristChant',
    label: 'ChristChant',
    component: <HelpCenter />,
  },
  {
    id: 'helpCenter',
    label: 'Help Center',
    component: <HelpCenter />,
  },
]

const dropDownBtnStyles = (isOpen: boolean) =>
  `items-center space-x-2 transition-colors duration-200 hidden sm:flex ${
    isOpen ? 'text-blue-500' : 'hover:text-blue-500'
  }`

const IconRotation = (isOpen: boolean) =>
  `duration-500 ease-in-out ${isOpen ? 'rotate-0' : 'rotate-180'}`

const test = (isOpen: boolean) =>
  `fixed bg-gradient-to-b from-[#153636] to-[#245C5B]backdrop-filter backdrop-blur-lg w-[84%] left-[calc(50%-42%)] h-auto rounded-lg opacity-0 duration-500 ease-in-out z-50 ${
    isOpen ? 'opacity-100 mt-6 ' : ' mt-44 opacity-0'
  }`

const bgBlack = (isOpen: boolean) =>
  `bg-black -left-4 top-16 w-screen opacity-0 h-screen fixed ${
    isOpen ? 'opacity-80 block' : 'opacity-0 hidden'
  }`

export default function DropdownItems() {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(
    Object.fromEntries(dropdownItems.map((item) => [item.id, false]))
  )
  const handleToggle = (id: string) => {
    setOpenStates((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])),
      [id]: !prev[id],
    }))
  }

  return (
    <>
      {dropdownItems.map((item) => (
        <>
          <button
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={dropDownBtnStyles(openStates[item.id])}
          >
            <span>{item.label}</span>
            <span className={IconRotation(openStates[item.id])}>
              <IconChevronUp size={16} />
            </span>
          </button>
          <div
            onClick={() =>
              setOpenStates((prev) =>
                Object.fromEntries(Object.keys(prev).map((key) => [key, false]))
              )
            }
            className={bgBlack(openStates[item.id])}
          />
        </>
      ))}

      <div className={``}>
        {/* {dropdownItems.map(item => (
          openStates[item.id] && (
            <div 
              key={item.id}
              className={``}
            >
              {item.component}
              <div 
                onClick={() => setOpenStates(prev => Object.fromEntries(Object.keys(prev).map(key => [key, false])))}
                className={`bg-black top-12 w-full opacity-50 h-full fixed inset-0 z-10`}
              />
            </div>
          )
        ))} */}

        <div className={`${test(openStates['helpCenter'])} `}>
          <HelpCenter />
        </div>
        <div className={`${test(openStates['ChristChant'])} `}>
          <HelpCenter />
        </div>
        <div className={`${test(openStates['search'])} `}>
          <Search>
            <div>
              this is Search
          </div></Search>
        </div>
      </div>
    </>
  )
}
