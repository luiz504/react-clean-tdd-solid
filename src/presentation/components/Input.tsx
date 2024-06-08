import { ComponentProps, FC, forwardRef } from 'react'
import { cn } from '../utils/cn'

type RootProps = ComponentProps<'div'> & {
  children: React.ReactNode
}

const Input = ({ className, children, ...rest }: RootProps) => {
  return (
    <div
      className={cn('relative mt-4 flex w-full flex-col', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

type InputFieldProps = ComponentProps<'input'>
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={cn([
          'flex-grow',
          'rounded border border-primary-light px-3 text-sm leading-10',
          'focus-within:outline-primary-light',
          className,
        ])}
        {...rest}
        ref={ref}
      />
    )
  },
)

InputField.displayName = 'InputField'

type PropsError = ComponentProps<'span'> & {
  error?: string
}
const Error: FC<PropsError> = ({ error, className, ...rest }) => {
  return (
    error && (
      <span
        role="alert"
        className={cn('ml-0.5 mt-0.5 text-xs text-red-500', className)}
        {...rest}
      >
        {error}
      </span>
    )
  )
}
Input.InputField = InputField
Input.Error = Error
export { Input }
