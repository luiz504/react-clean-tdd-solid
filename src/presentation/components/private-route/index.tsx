import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useApiContext } from '~/presentation/context/api-context/hook'

type Props = {
  element: JSX.Element
}
export const PrivateRoute: FC<Props> = ({ element }) => {
  const { getCurrentAccount } = useApiContext()
  const accessToken = getCurrentAccount()?.accessToken
  return accessToken ? element : <Navigate to="/sign-in" />
}
