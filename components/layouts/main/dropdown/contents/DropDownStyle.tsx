import { ReactNode } from 'react'

interface DropDownProps {
  children: ReactNode
}

export default function DropDown({ children }: DropDownProps) {
  return (
    <div className={`absolute max-h-96`}>
      <div
        className={`bg-white fixed w-[84%] rounded-lg left-[calc(50%-42%)] h-96 top-12 inset-0 z-20 max-h-96 opacity-100`}
      >
        {children}
      </div>
    </div>
  )
}
