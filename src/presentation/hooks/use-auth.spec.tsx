import { MemoryRouter } from 'react-router-dom'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from './use-auth'
import { ApiContext } from '../context/api-context/context'

const useNavigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom')
  return {
    ...mod,
    useNavigate: () => useNavigateMock,
  }
})
const clearQueryClientMock = vi.fn()
vi.mock('@tanstack/react-query', async () => {
  const mod = await vi.importActual('@tanstack/react-query')
  return {
    ...mod,
    useQueryClient: () => ({
      clear: clearQueryClientMock,
    }),
  }
})
const makeSut = () => {
  const setCurrentAccountMock = vi.fn()
  const queryClient = new QueryClient()
  const { result } = renderHook(useAuth, {
    wrapper: ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <ApiContext.Provider
              value={{
                getCurrentAccount: vi.fn(),
                setCurrentAccount: setCurrentAccountMock,
              }}
            >
              {children}
            </ApiContext.Provider>
          </MemoryRouter>
        </QueryClientProvider>
      )
    },
  })

  return { sut: result, setCurrentAccountMock }
}

describe('Hooks: useAuth', () => {
  it('should call setCurrentAccount with null, clear queryClient and redirect to /sign-in', () => {
    const { sut, setCurrentAccountMock } = makeSut()

    sut.current.signOut()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(useNavigateMock).toHaveBeenCalledWith('/sign-in')
    expect(clearQueryClientMock).toHaveBeenCalled()
  })
})
