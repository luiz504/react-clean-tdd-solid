import { fireEvent, render, screen } from '@testing-library/react'
import { HeaderPrivate } from './HeaderPrivate'

import { ApiContext } from '~/presentation/context/api-context/context'
import { MemoryRouter } from 'react-router-dom'
import { mockAccountModel } from '~/domain/__test__'
const ELEMENTS_TEST_ID = {
  'logout-btn': 'logout-btn',
  'user-name': 'user-name',
} as const
const mockedNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom')
  return {
    ...mod,
    useNavigate: () => mockedNavigate,
  }
})

const makeSut = (account = mockAccountModel()) => {
  const signOut = vi.fn()
  render(
    <MemoryRouter>
      <ApiContext.Provider
        value={{
          getCurrentAccount: () => account,
          signOut,
          setCurrentAccount: vi.fn(),
        }}
      >
        <HeaderPrivate />
      </ApiContext.Provider>
    </MemoryRouter>,
  )
  return {
    signOut,
  }
}

describe('Component: HeaderPrivate', () => {
  it('should call signOut when logout button is clicked', () => {
    const { signOut } = makeSut()
    fireEvent.click(screen.getByTestId(ELEMENTS_TEST_ID['logout-btn']))
    expect(signOut).toHaveBeenCalled()
  })

  it('should render userName correctly', () => {
    const account = mockAccountModel()
    makeSut(account)

    expect(screen.getByTestId(ELEMENTS_TEST_ID['user-name'])).toHaveTextContent(
      account.name,
    )
  })
})
