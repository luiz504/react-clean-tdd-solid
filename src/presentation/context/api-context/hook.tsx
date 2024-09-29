import { useContext } from 'react'
import { ApiContext } from './context'

export const useApiContext = () => {
  const context = useContext(ApiContext)

  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
