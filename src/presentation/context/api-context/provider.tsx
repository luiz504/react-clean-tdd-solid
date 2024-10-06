import { FC, PropsWithChildren, useCallback } from 'react'
import { ApiContext } from './context'

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '~/main/adapters/current-account-adapter'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export const ApiContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const signOut = useCallback(() => {
    setCurrentAccountAdapter(null)
    navigate('/sign-in')
    queryClient.clear()
  }, [navigate, queryClient])

  return (
    <ApiContext.Provider
      value={{
        signOut,
        getCurrentAccount: getCurrentAccountAdapter,
        setCurrentAccount: setCurrentAccountAdapter,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
