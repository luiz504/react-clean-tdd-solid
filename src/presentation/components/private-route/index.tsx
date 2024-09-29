import { FC } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  element: JSX.Element
}
export const PrivateRoute: FC<Props> = () => {
  return <Navigate to="/login" />
}
