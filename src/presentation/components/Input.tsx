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

type InputFieldProps = ComponentProps<'input'> & {
  label: string
}
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, placeholder, label, ...rest }, ref) => {
    return (
      <div className={cn('relative h-10 w-full min-w-[200px]', className)}>
        <input
          ref={ref}
          className="peer h-full w-full border-b border-gray-200 bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder:opacity-0 placeholder-shown:border-gray-200 focus:border-gray-500 focus:outline-0 focus:placeholder:opacity-100 disabled:border-0 disabled:bg-gray-50"
          placeholder={placeholder || ' '}
          {...rest}
        />
        <label className="after:content[''] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
          {label}
        </label>
      </div>
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
