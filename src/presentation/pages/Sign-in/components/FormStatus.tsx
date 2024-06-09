import { ComponentProps, FC } from 'react'
import { Spinner } from '~/presentation/components/Spinner'
import { cn } from '~/presentation/utils/cn'

type Props = ComponentProps<'div'> & {
  error?: string
  isLoading?: boolean
}

export const FormStatus: FC<Props> = ({
  error,
  isLoading = false,
  className,
  ...rest
}) => {
  return (
    <div
      data-testid="form-status"
      className={cn('flex flex-col items-center', className)}
      {...rest}
    >
      {isLoading && (
        <Spinner data-testid="form-status-spinner" className="mt-8" />
      )}

      {error && (
        <span
          data-testid="form-status-error"
          className="mt-8 text-sm text-primary-light"
        >
          {error}
        </span>
      )}
    </div>
  )
}
