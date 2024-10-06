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
  const setCurrentAccountMock = vi.fn()
  render(
    <MemoryRouter>
      <ApiContext.Provider
        value={{
          getCurrentAccount: () => account,
          setCurrentAccount: setCurrentAccountMock,
        }}
      >
        <HeaderPrivate />
      </ApiContext.Provider>
    </MemoryRouter>,
  )
  return {
    setCurrentAccountMock,
  }
}

describe('Component: HeaderPrivate', () => {
  it('should call setCurrentAccount with null and redirect to /sign-in', () => {
    const { setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId(ELEMENTS_TEST_ID['logout-btn']))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(mockedNavigate).toHaveBeenCalledWith('/sign-in')
  })

  it('should render userName correctly', () => {
    const account = mockAccountModel()
    const { setCurrentAccountMock } = makeSut(account)
    const userName = 'any_user'
    setCurrentAccountMock(userName)
    expect(screen.getByTestId(ELEMENTS_TEST_ID['user-name'])).toHaveTextContent(
      account.name,
    )
  })
})
