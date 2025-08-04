import Image from 'next/image'

interface Props {
  height?: number
  width?: number
  className?: string
  onClick?: () => void
  logoUrl?: string
  withOnClick?: boolean
}

export default function Logo({
  height,
  width,
  className,
  onClick,
  logoUrl = '/logo.png',
  withOnClick = true,
}: Props) {
  return (
    <Image
      onClick={onClick}
      src={logoUrl}
      alt="logo"
      width={width || 100}
      height={height || 100}
      className={`${className} ${withOnClick ? 'cursor-pointer' : ''}`}
    />
  )
}
