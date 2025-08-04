import { InfoCircledIcon } from '@radix-ui/react-icons'
import FormWrapper from '../FormWrapper'
import { Select, SelectItem, Tooltip } from '@heroui/react'
import { Controller } from 'react-hook-form'

interface Props {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  isRequired?: boolean
  disabled?: boolean
  error?: string
  className?: string
  register?: any
  info?: string
  control?: any
}

export default function SelectInput({
  name,
  label,
  options,
  isRequired,
  disabled,
  error,
  className = '',
  info,
  control,
  placeholder,
}: Props) {
  return (
    <FormWrapper
      label={
        <div className="flex items-center">
          {label}
          <Tooltip content={info}>
            <span className="ml-2 cursor-pointer">
              <InfoCircledIcon className="h-4 w-4" />
            </span>
          </Tooltip>
        </div>
      }
      isRequired={isRequired}
      error={error}
      className={className}
    >
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            onBlur={onBlur}
            onChange={onChange}
            selectedKeys={[value]}
            disabled={disabled}
            items={options}
            classNames={{
              mainWrapper: 'mb-[0.4rem]',
              innerWrapper: 'px-0',
            }}
            variant="bordered"
            aria-invalid={!!error}
            radius="sm"
            placeholder={placeholder}
          >
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500" id={`${name}-error`}>
          {error}
        </p>
      )}
    </FormWrapper>
  )
}
