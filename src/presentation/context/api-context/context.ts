import { createContext } from 'react'
import { AccountModel } from '~/domain/models'

export type ApiContextType = {
  setCurrentAccount: (account: AccountModel | null) => void
  getCurrentAccount: () => AccountModel | null
}
export const ApiContext = createContext<ApiContextType | null>(null)
