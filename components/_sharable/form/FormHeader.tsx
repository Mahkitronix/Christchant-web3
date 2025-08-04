import Logo from '../Logo'

interface Props {
  title?: string
  description?: string
  logoUrl?: string
  withLogo?: boolean
}

export default function FormHeader({
  title,
  description,
  logoUrl,
  withLogo = true,
}: Props) {
  return (
    <>
      <div className="flex w-full items-center justify-center px-12 py-3">
        {(logoUrl || withLogo) && (
          <Logo withOnClick={false} height={10} width={70} />
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>{' '}
    </>
  )
}
