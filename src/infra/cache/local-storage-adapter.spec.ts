import { faker } from '@faker-js/faker'
import { LocalStorageAdapter } from './local-storage-adapter'
import { mockAccountModel } from '~/domain/__test__'

const makeSut = () => {
  const sut = new LocalStorageAdapter()
  return { sut }
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  describe('set', () => {
    it('should call localStorage with correct values', () => {
      const { sut } = makeSut()

      const key = faker.database.column()
      const value = faker.finance.currency()

      sut.set(key, value)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(value),
      )
    })
    it('should call removeItem if value is null or undefined', () => {
      const { sut } = makeSut()

      sut.set('key2', null)
      expect(localStorage.removeItem).toHaveBeenCalledWith('key2')
      sut.set('key3', undefined)
      expect(localStorage.removeItem).toHaveBeenCalledWith('key3')
      expect(localStorage.getItem).not.toHaveBeenCalled()
    })
  })
  describe('get', () => {
    it('should call localStorage with correct value', () => {
      const { sut } = makeSut()
      const key = faker.database.column()
      const value = JSON.stringify(mockAccountModel())
      localStorage.setItem(key, value)

      // Act
      const result = sut.get(key)

      expect(localStorage.getItem).toHaveBeenCalledWith(key)
      expect(result).toEqual(value)
    })
  })
})
