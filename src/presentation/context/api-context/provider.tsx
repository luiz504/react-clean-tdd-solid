import { FC, PropsWithChildren } from 'react'
import { ApiContext } from './context'

import { setCurrentAccountAdapter } from '~/main/adapters/current-account-adapter'

export const ApiContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApiContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter }}
    >
      {children}
    </ApiContext.Provider>
  )
}
