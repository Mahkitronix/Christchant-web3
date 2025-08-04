import { Input } from '@heroui/react'
import FormWrapper from '../FormWrapper'
import { Controller } from 'react-hook-form'

interface Props {
  label: string
  placeholder?: string
  isRequired?: boolean
  variant?: any | 'solid' | 'bordered' | 'flat' | 'faded' | 'shadow' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  value?: string
  disabled?: boolean
  error?: string
  className?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  control: any
  name: string
}

export default function TextInput({
  label,
  placeholder = 'Enter your email',
  isRequired,
  variant = 'bordered',
  size = 'md',
  disabled,
  error,
  className,
  control,
  name,
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
          <Input
            onBlur={onBlur}
            onChange={onChange}
            type="text"
            value={value}
            size={size}
            radius="sm"
            placeholder={placeholder}
            isDisabled={disabled}
            isInvalid={!!error}
            errorMessage={error}
            variant={variant}
            classNames={{
              input: `text-sm`,
              inputWrapper: 'shadow-sm',
            }}
            autoComplete="off"
          />
        )}
      />
    </FormWrapper>
  )
}
