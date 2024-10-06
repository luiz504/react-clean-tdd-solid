import { renderHook } from '@testing-library/react'
import { useHandleErrors } from './use-handle-errors'
import { AccessDeniedError } from '~/domain/errors'

const signOutMock = vi.fn()
vi.mock('./use-auth', () => ({
  useAuth: () => ({
    signOut: signOutMock,
  }),
}))

const makeSut = () => {
  const { result } = renderHook(useHandleErrors)
  return {
    sut: result,
  }
}
describe('Hooks: useHandleErrors', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should call signOut if error is AccessDeniedError', () => {
    const { sut } = makeSut()
    sut.current.handleError(new AccessDeniedError())

    expect(signOutMock).toHaveBeenCalled()
  })
  it('should not call signOut if error is not AccessDeniedError', () => {
    const { sut } = makeSut()
    sut.current.handleError(new Error())

    expect(signOutMock).not.toHaveBeenCalled()
  })
})
