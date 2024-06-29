import { faker } from '@faker-js/faker'
import { StorageSpy } from '~/data/__test__'
import { LocalSaveAccessToken } from './local-save-access-token'

const makeSut = () => {
  const storageSpy = new StorageSpy()
  const sut = new LocalSaveAccessToken(storageSpy)
  return { sut, storageSpy }
}

describe('LocalSaveAccessToken', () => {
  it('should call Storage.save with correct values', async () => {
    const { storageSpy, sut } = makeSut()

    const accessToken = faker.string.uuid()
    await sut.save(accessToken)

    expect(storageSpy.key).toBe('accessToken')
    expect(storageSpy.value).toBe(accessToken)
  })
})
