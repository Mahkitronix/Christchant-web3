import Image from 'next/image'

export default function MainLogo({
  width = 35,
  height = 35,
  onMouseEnter,
  onClick,
  className,
  isFull = false,
}: {
  width?: number
  height?: number
  onMouseEnter?: () => void
  onClick?: () => void
  className?: string
  isFull?: boolean
}) {
  return (
    // TODO: Make logo like a king crown
    <>
      {!isFull && (
        <Image
          onClick={onClick}
          src="/logo.svg"
          alt="Logo"
          width={width}
          height={height}
          className={`${className} flex items-center`}
          onMouseEnter={onMouseEnter}
        />
      )}
      {isFull && (
        <Image
          onClick={onClick}
          src="/logo.svg"
          alt="Logo"
          width={width}
          height={height}
          className={`${className} flex items-center`}
          onMouseEnter={onMouseEnter}
        />
      )}
    </>
  )
}
