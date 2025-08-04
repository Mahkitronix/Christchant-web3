import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface UiCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  hover?: boolean
  noPadding?: boolean
}

export default function UiCard({
  children,
  className,
  variant = 'default',
  size = 'md',
  hover = false,
  noPadding = false,
}: UiCardProps) {
  const variants = {
    default: 'bg-white shadow-[0_0_15px_rgba(0,0,0,0.03)]',
    outline: 'border border-gray-200 bg-white',
    ghost: 'bg-gray-50/50',
  }

  const sizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        variants[variant],
        !noPadding && sizes[size],
        hover &&
          'hover:scale-[1.01] hover:border-primary/20 hover:shadow-[0_0_15px_rgba(0,0,0,0.06)]',
        className
      )}
    >
      {children}
    </div>
  )
}

// Header component for the card
export function UiCardHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-gray-100 pb-4',
        className
      )}
    >
      {children}
    </div>
  )
}

// Body component for the card
export function UiCardBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('', className)}>{children}</div>
}

// Footer component for the card
export function UiCardFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-gray-100 pt-4',
        className
      )}
    >
      {children}
    </div>
  )
}
