import { FC, PropsWithChildren } from 'react'
import { ApiContext } from './context'

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '~/main/adapters/current-account-adapter'

export const ApiContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApiContext.Provider
      value={{
        getCurrentAccount: getCurrentAccountAdapter,
        setCurrentAccount: setCurrentAccountAdapter,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
