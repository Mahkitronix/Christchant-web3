import { Textarea } from '@heroui/react'
import FormWrapper from '../FormWrapper'
import { Controller } from 'react-hook-form'

interface Props {
  name: string
  label: string
  placeholder?: string
  isRequired?: boolean
  variant?: any | 'solid' | 'bordered' | 'flat' | 'faded' | 'shadow' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  value?: string
  disabled?: boolean
  error?: string
  className?: string
  control: any
}

export default function TextAreaInput({
  name,
  label,
  placeholder = 'Enter your email',
  isRequired,
  variant = 'bordered',
  size = 'md',
  disabled,
  error,
  className,
  control,
}: Props) {
  return (
    <FormWrapper label={label} isRequired={isRequired} className={className}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Textarea
            placeholder={placeholder}
            variant={variant}
            size={size}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {error && <div className="text-md text-red-500">{error}</div>}
    </FormWrapper>
  )
}
