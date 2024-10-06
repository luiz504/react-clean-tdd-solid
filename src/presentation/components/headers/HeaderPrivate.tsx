import { ComponentProps, FC } from 'react'

import { useApiContext } from '~/presentation/context/api-context/hook'
import { cn } from '~/presentation/utils/cn'

type Props = ComponentProps<'header'>

export const HeaderPrivate: FC<Props> = ({ className, ...rest }) => {
  const { signOut, getCurrentAccount } = useApiContext()

  return (
    <header
      className={cn(
        'flex justify-center px-4 py-4 md:py-10',
        'bg-gradient-to-b from-primary-dark to-primary',
        className,
      )}
      {...rest}
    >
      <div className="flex max-w-[800px] grow items-center justify-between">
        <img className="h-[60px]" src="/logo.svg" alt="logo" />

        <div className="flex flex-col items-end gap-1 text-white">
          <span data-testid="user-name">{getCurrentAccount()?.name}</span>
          <button
            data-testid="logout-btn"
            type="button"
            className="rounded-lg py-1 text-sm outline-offset-4 transition-colors hover:text-gray-300"
            onClick={signOut}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
