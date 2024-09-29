import { mockAccountModel } from '~/domain/__test__'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from './current-account-adapter'
import { LocalStorageAdapter } from '~/infra/cache/local-storage-adapter'
import {
  InvalidResourceFormatError,
  ResourceNotFoundError,
  UnexpectedError,
} from '~/domain/errors'

describe('CurrentAccountAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  describe('setCurrentAccountAdapter', () => {
    it('should call LocalStorageAdapter.set with correct values', () => {
      const setSpy = vi.spyOn(LocalStorageAdapter.prototype, 'set')
      const account = mockAccountModel()
      setCurrentAccountAdapter(account)
      expect(setSpy).toHaveBeenCalledWith('account', account)
    })
    it('should throw InvalidResourceFormatError if no account is provided', () => {
      expect(() => setCurrentAccountAdapter(null as any)).toThrow(
        new InvalidResourceFormatError(),
      )
    })
  })

  describe('getCurrentAccountAdapter', () => {
    it('should call LocalStorageAdapter.get with correct value', () => {
      const account = mockAccountModel()
      const getSpy = vi
        .spyOn(LocalStorageAdapter.prototype, 'get')
        .mockReturnValueOnce(JSON.stringify(account))
      const result = getCurrentAccountAdapter()

      expect(getSpy).toHaveBeenCalledWith('account')
      expect(result).toEqual(account)
    })
    it('should throw ResourceNotFoundError if no account is stored', () => {
      expect(() => getCurrentAccountAdapter()).toThrow(
        new ResourceNotFoundError(),
      )
    })
    it('should throw InvalidResourceFormatError if the stored account an invalid object', () => {
      localStorage.setItem(
        'account',
        JSON.stringify({ value: 'invalid account persisted' }),
      )

      expect(() => getCurrentAccountAdapter()).toThrow(
        new InvalidResourceFormatError(),
      )
    })
    it('should throw UnexpectedError if an unexpected error is thrown', () => {
      localStorage.setItem('account', 'invalid json persisted')

      expect(() => getCurrentAccountAdapter()).toThrow(new UnexpectedError())
    })
  })
})
