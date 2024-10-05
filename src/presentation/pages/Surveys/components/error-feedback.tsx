import { ComponentProps, FC } from 'react'
import { cn } from '~/presentation/utils/cn'

type Props = {
  onClickTryAgain: () => void
} & ComponentProps<'div'>
export const ErrorFeedback: FC<Props> = ({
  onClickTryAgain,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-white p-10 shadow-md',
        className,
      )}
      {...rest}
    >
      <p className="text-center text-xl font-medium text-neutral-500">
        Falha ao carregar surveys
      </p>

      <button
        data-testid="survey-load-error-btn"
        className="rounded-md bg-primary px-4 py-2 text-white"
        onClick={onClickTryAgain}
      >
        Tentar novamente
      </button>
    </div>
  )
}
