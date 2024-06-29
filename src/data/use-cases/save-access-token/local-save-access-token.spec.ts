import { faker } from '@faker-js/faker'
import { StorageMock } from '~/data/__test__'
import { LocalSaveAccessToken } from './local-save-access-token'

const makeSut = () => {
  const storageMock = new StorageMock()
  const sut = new LocalSaveAccessToken(storageMock)
  return { sut, storageMock }
}

describe('LocalSaveAccessToken', () => {
  it('should call Storage.save with correct values', async () => {
    const { storageMock, sut } = makeSut()

    const accessToken = faker.string.uuid()
    await sut.save(accessToken)

    expect(storageMock.key).toBe('accessToken')
    expect(storageMock.value).toBe(accessToken)
  })
})
