import { faker } from '@faker-js/faker'
import { StorageSpy } from '~/data/__test__'
import { LocalSaveAccessToken } from './local-save-access-token'

describe('LocalSaveAccessToken', () => {
  it('should call Storage.save with correct values', async () => {
    const storageSpy = new StorageSpy()
    const sut = new LocalSaveAccessToken(storageSpy)
    const accessToken = faker.string.uuid()

    await sut.save(accessToken)
    expect(storageSpy.key).toBe('accessToken')
    expect(storageSpy.value).toBe(accessToken)
  })
})
