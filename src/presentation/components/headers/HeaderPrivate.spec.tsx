import { fireEvent, render, screen } from '@testing-library/react'
import { HeaderPrivate } from './HeaderPrivate'

import { ApiContext } from '~/presentation/context/api-context/context'
import { MemoryRouter } from 'react-router-dom'
import { mockAccountModel } from '~/domain/__test__'
const ELEMENTS_TEST_ID = {
  'logout-btn': 'logout-btn',
  'user-name': 'user-name',
} as const

const signOutMock = vi.fn()
vi.mock('~/presentation/hooks/use-auth', () => ({
  useAuth: () => ({
    signOut: signOutMock,
  }),
}))

const makeSut = (account = mockAccountModel()) => {
  render(
    <MemoryRouter>
      <ApiContext.Provider
        value={{
          getCurrentAccount: () => account,

          setCurrentAccount: vi.fn(),
        }}
      >
        <HeaderPrivate />
      </ApiContext.Provider>
    </MemoryRouter>,
  )
}

describe('Component: HeaderPrivate', () => {
  it('should call signOut when logout button is clicked', () => {
    makeSut()
    fireEvent.click(screen.getByTestId(ELEMENTS_TEST_ID['logout-btn']))
    expect(signOutMock).toHaveBeenCalled()
  })

  it('should render userName correctly', () => {
    const account = mockAccountModel()
    makeSut(account)

    expect(screen.getByTestId(ELEMENTS_TEST_ID['user-name'])).toHaveTextContent(
      account.name,
    )
  })
})
