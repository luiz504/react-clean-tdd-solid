import { ComponentProps, FC } from 'react'
import { cn } from '~/presentation/utils/cn'

type Props = ComponentProps<'div'>

export const SurveySkeleton: FC<Props> = ({ className, ...rest }) => {
  return (
    <div
      className={cn(
        'relative max-w-full animate-pulse rounded-md bg-white shadow-sm',
        className,
      )}
      {...rest}
    >
      <div className="absolute -right-2 -top-2 size-8 rounded-full bg-gray-300 shadow-sm" />

      <div className="flex gap-6 p-4 pr-6 pt-6">
        <div className="flex h-28 min-w-20 flex-col items-center justify-center rounded-md bg-gray-300 px-2">
          <div className="mb-3 block h-9 w-full rounded-md bg-gray-100">
            &nbsp;
          </div>

          <div className="mb-2 block h-3 w-full rounded-md bg-gray-100">
            &nbsp;
          </div>

          <div className="block h-3 w-full rounded-md bg-gray-100">&nbsp;</div>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="mb-2 block h-2 w-4/5 rounded-md bg-gray-300">
            &nbsp;
          </div>
          <div className="mb-2 block h-2 w-full rounded-md bg-gray-300">
            &nbsp;
          </div>
          <div className="mb-2 block h-2 w-5/6 rounded-md bg-gray-300">
            &nbsp;
          </div>
        </div>
      </div>
      <div className="flex min-h-10 items-center justify-center rounded-b-md bg-gray-300">
        <div className="h-5 w-1/3 rounded-md bg-gray-100">&nbsp;</div>
      </div>
    </div>
  )
}
