import { ComponentProps, FC } from 'react'
import { Spinner } from '~/presentation/components/Spinner'
import { cn } from '~/presentation/utils/cn'

type Props = ComponentProps<'div'> & {
  error?: string
  loading?: boolean
}

export const FormStatus: FC<Props> = ({
  error,
  loading = false,
  className,
  ...rest
}) => {
  return (
    <div className={cn('flex flex-col items-center', className)} {...rest}>
      {loading && <Spinner className="mt-8" />}

      {error && (
        <span className="mt-8 text-sm text-primary-light">{error}</span>
      )}
    </div>
  )
}
