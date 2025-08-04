import { Input } from '@heroui/react'
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

export default function EmailInput({
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
          <Input
            onBlur={onBlur}
            onChange={onChange}
            type="email"
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
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              input.value = input.value.replace(/\s/g, '')
            }}
          />
        )}
      />
    </FormWrapper>
  )
}
