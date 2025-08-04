import { Button, Spinner } from '@heroui/react'
import { ReactNode } from 'react'

interface Props {
  text: string
  variant?:
    | any
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost'
  className?: string
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
  startContent?: ReactNode
  onClick?: () => void
  htmlType?: 'submit' | 'button'
}

export default function FormActionButton({
  text,
  variant,
  className,
  disabled,
  isLoading = false,
  loadingText,
  startContent,
  onClick,
  htmlType,
}: Props) {
  return (
    <Button
      type={htmlType}
      variant={variant}
      className={className + ' mt-2'}
      isDisabled={disabled || isLoading}
      isLoading={isLoading}
      spinner={<Spinner size="sm" color="current" />}
      startContent={startContent}
      onClick={onClick}
    >
      {isLoading ? loadingText || text : text}
    </Button>
  )
}
