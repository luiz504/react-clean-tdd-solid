import { render, screen, waitFor } from '@testing-library/react'
import { PrivateRoute } from '.'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ApiContext } from '~/presentation/context/api-context/context'

import { mockAccountModel } from '~/domain/__test__'
import { AccountModel } from '~/domain/models'

const makeSut = (account: AccountModel | null = mockAccountModel()) => {
  return (
    <ApiContext.Provider
      value={{ getCurrentAccount: () => account, setCurrentAccount: vi.fn() }}
    >
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute element={<div data-testid="home" />} />}
          />
          <Route path="/sign-in" element={<div data-testid="sign-in" />} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )
}

describe('PrivateRoute', () => {
  it('should redirect to /sign-in if token is empty', async () => {
    render(makeSut(null))

    await waitFor(() => {
      expect(screen.getByTestId('sign-in')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('home')).not.toBeInTheDocument()
  })
  it('should not redirect to /sign-in if token is not empty', async () => {
    render(makeSut())
    await waitFor(() => {
      expect(screen.getByTestId('home')).toBeInTheDocument()
    })
  })
})
