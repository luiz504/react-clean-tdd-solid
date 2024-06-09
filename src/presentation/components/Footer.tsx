import { ComponentProps, FC } from 'react'
import { cn } from '../utils/cn'

type Props = ComponentProps<'footer'>

export const Footer: FC<Props> = ({ className, ...rest }) => {
  return <footer className={cn('h-12 bg-primary', className)} {...rest} />
}
