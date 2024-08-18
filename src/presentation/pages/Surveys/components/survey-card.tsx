import { ComponentProps, FC } from 'react'
import { cn } from '~/presentation/utils/cn'
import { LikeActionBtn } from './like-action-btn'

type Props = ComponentProps<'li'>

export const SurveyCard: FC<Props> = ({ className, ...rest }) => {
  return (
    <li
      className={cn(
        'flex flex-col justify-between rounded-md shadow-md',
        className,
      )}
      {...rest}
    >
      <div className="card-bg relative flex flex-1 gap-6 rounded-t-md px-4 pb-4 pt-6">
        <LikeActionBtn className="absolute -right-2 -top-2" status="like" />

        <time className="flex h-fit flex-col items-center justify-center self-center rounded-md bg-primary-light px-5 py-2 font-medium text-white">
          <span className="text-4xl font-bold">22</span>
          <span className="my-1 lowercase">May</span>
          <span>2020</span>
        </time>
        <p className="text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
        </p>
      </div>
      <button className="min-h-10 rounded-b-md bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
        Ver Result
      </button>
    </li>
  )
}
