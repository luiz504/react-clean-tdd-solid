import { ComponentProps, FC } from 'react'
import { cn } from '../utils/cn'

type Props = ComponentProps<'div'>
export const Spinner: FC<Props> = ({ className, ...rest }) => {
  return (
    <div
      className={cn(
        'flex w-full flex-1 items-center justify-center gap-x-2',
        className,
      )}
      {...rest}
    >
      <div className="size-3 animate-bounce-&-pulse rounded-full bg-primary-light" />
      <div className="size-3 animate-bounce-&-pulse rounded-full bg-primary" />
      <div className="size-3 animate-bounce-&-pulse rounded-full bg-primary-dark" />
    </div>
  )
}
