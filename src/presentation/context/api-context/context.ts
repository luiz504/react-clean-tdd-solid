import { createContext, useContext } from 'react'
import { AccountModel } from '~/domain/models'

type ApiContextType = {
  setCurrentAccount: (account: AccountModel) => void
  getCurrentAccount: () => AccountModel | null
}
export const ApiContext = createContext<ApiContextType | null>(null)

export const useApiContext = () => {
  const context = useContext(ApiContext)

  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
