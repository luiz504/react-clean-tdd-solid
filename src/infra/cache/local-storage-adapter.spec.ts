import { faker } from '@faker-js/faker'
import { LocalStorageAdapter } from './local-storage-adapter'

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
      const value = faker.string.uuid()

      sut.set(key, value)

      expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
    })
  })
})
