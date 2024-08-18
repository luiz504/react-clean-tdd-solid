import { ComponentProps, FC } from 'react'
import { cn } from '~/presentation/utils/cn'

type Props = ComponentProps<'header'>

export const HeaderGuest: FC<Props> = ({ className, ...rest }) => {
  return (
    <header
      className={cn(
        'flex flex-col items-center px-4 py-4 md:py-10',
        'bg-gradient-to-b from-primary-dark to-primary',
        className,
      )}
      {...rest}
    >
      <img className="h-12 md:h-[87px]" src="/logo.svg" alt="logo" />

      <h1 className="mt-4 text-sm font-bold text-white">
        4Dev - Polls for programmers
      </h1>
    </header>
  )
}
