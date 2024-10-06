import { useNavigate } from 'react-router-dom'
import { useApiContext } from '../context/api-context/hook'
import { useQueryClient } from '@tanstack/react-query'

export const useAuth = () => {
  const { setCurrentAccount } = useApiContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const signOut = () => {
    setCurrentAccount(null)
    navigate('/sign-in')
    queryClient.clear()
  }

  return { signOut }
}
