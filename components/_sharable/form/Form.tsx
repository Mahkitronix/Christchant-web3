import React from 'react'

interface Props {
  children: any
  onSubmit: any
  className?: string
}

export default function Form({ children, onSubmit, className }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col space-y-4 px-8 ${className}`}
    >
      {children}
    </form>
  )
}
