import Style from '@/styles/main/layout/main-container.module.css'
import { ReactNode } from 'react'

interface MainContainerProps {
  children: ReactNode
  className?: string
}

export default function MainContainer({
  children,
  className,
}: MainContainerProps) {
  return (
    <div className={` bg-transparent ${Style.mainContainer} ${className}`}>
      {children}
    </div>
  )
}
