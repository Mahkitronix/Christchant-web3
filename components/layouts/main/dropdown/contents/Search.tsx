import { ReactNode } from 'react'

export default function Search({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-4">
      <div className="rounded-t-lg">
        <div className="rounded-t-lg"></div>
      </div>
      <input
        type="search"
        placeholder="Search..."
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>
        {children}
      </div>
    </div>
  )
}
