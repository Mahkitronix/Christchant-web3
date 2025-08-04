import { ReactNode } from 'react'

export default function ButtonBorder({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <button className="text-black border border-[#166395] py-3 px-16 hover:bg-primary/80 font-medium rounded-lg text-sm text-center text-white hover:border-[#166395] hover:text-white">
        {children}
      </button>
    </div>
  )
}