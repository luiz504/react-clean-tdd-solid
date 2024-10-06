import { AccessDeniedError } from '~/domain/errors'
import { useAuth } from './use-auth'

export const useHandleErrors = () => {
  const { signOut } = useAuth()

  const handleError = (err: unknown): void => {
    if (err instanceof AccessDeniedError) {
      signOut()
    }
  }

  return { handleError }
}
