import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { Controller } from 'react-hook-form'
import FormWrapper from '../FormWrapper'
import { Input } from '@heroui/react'
import { useState } from 'react'

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

export default function PasswordInput({
  name = 'password',
  label,
  placeholder = 'Enter your password',
  isRequired,
  variant = 'bordered',
  size = 'md',
  disabled,
  error,
  className,
  control,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

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
            onChange={onChange}
            onBlur={onBlur}
            type={isVisible ? 'text' : 'password'}
            value={value}
            size={size}
            radius="sm"
            placeholder={placeholder}
            isDisabled={disabled}
            variant={variant}
            isInvalid={!!error}
            errorMessage={error}
            classNames={{
              input: 'text-sm',
              inputWrapper: 'shadow-sm',
            }}
            autoComplete="off"
            endContent={
              <button
                className={`text-2xl text-default-400 focus:outline-none`}
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeOpenIcon className={`${!!error && 'text-red-500'}`} />
                ) : (
                  <EyeClosedIcon className={`${!!error && 'text-red-500'}`} />
                )}
              </button>
            }
          />
        )}
      />
    </FormWrapper>
  )
}
