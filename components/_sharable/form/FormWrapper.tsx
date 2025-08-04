interface Props {
  label: any
  isRequired?: boolean
  children?: React.ReactNode
  error?: string
  className?: string
}

export default function FormWrapper({
  label,
  isRequired,
  children,
  className = '',
}: Props) {
  return (
    <div className={`grid h-[80px] gap-2 ${className}`}>
      <div className="flex items-center text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="ml-1 text-red-700">*</span>}
      </div>

      {children}
    </div>
  )
}
