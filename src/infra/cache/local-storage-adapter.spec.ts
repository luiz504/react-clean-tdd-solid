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
