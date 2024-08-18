import { ComponentProps, FC } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

import { cn } from '~/presentation/utils/cn'

type Props = ComponentProps<'button'> & {
  status: 'like' | 'dislike'
}

export const LikeActionBtn: FC<Props> = ({
  status = 'dislike',
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(
        'flex items-center rounded-full p-2 shadow-md',
        status === 'like' && 'bg-green-500',
        status === 'dislike' && 'bg-red-500',
        className,
      )}
      {...rest}
    >
      {status === 'like' ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />}
    </button>
  )
}
