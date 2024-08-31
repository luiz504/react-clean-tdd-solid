import { mockAccountModel } from '~/domain/__test__'
import { setCurrentAccountAdapter } from './current-account-adapter'
import { LocalStorageAdapter } from '~/infra/cache/local-storage-adapter'

describe('CurrentAccountAdapter', () => {
  describe('setCurrentAccountAdapter', () => {
    it('should call localStorage with correct values', () => {
      const setSpy = vi.spyOn(LocalStorageAdapter.prototype, 'set')
      const account = mockAccountModel()
      setCurrentAccountAdapter(account)
      expect(setSpy).toHaveBeenCalledWith('account', account)
    })
  })
})
