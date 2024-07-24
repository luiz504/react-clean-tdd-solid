import { faker } from '@faker-js/faker'
import { StorageMock } from '~/data/__test__'
import { LocalSaveAccessToken } from './local-save-access-token'
import { UnexpectedError } from '~/domain/errors'

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
  it('should throw if Storage.save throws', async () => {
    const { storageMock, sut } = makeSut()

    vi.spyOn(storageMock, 'set').mockRejectedValueOnce(new Error())

    const promise = sut.save(faker.string.uuid())

    await expect(promise).rejects.toThrow(new Error())
  })
  it('should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined as any)
    await expect(promise).rejects.toThrow(
      new UnexpectedError('Access token is required'),
    )

    const promise2 = sut.save(null as any)
    await expect(promise2).rejects.toThrow(
      new UnexpectedError('Access token is required'),
    )

    const promise3 = sut.save('' as any)
    await expect(promise3).rejects.toThrow(
      new UnexpectedError('Access token is required'),
    )

    const promise4 = sut.save(0 as any)
    await expect(promise4).rejects.toThrow(
      new UnexpectedError('Access token is required'),
    )
  })

  it('should throw if accessToken is not a string', async () => {
    const { sut } = makeSut()
    const promise = sut.save([] as any)
    await expect(promise).rejects.toThrow(new UnexpectedError('Invalid token'))

    const promise2 = sut.save({} as any)
    await expect(promise2).rejects.toThrow(new UnexpectedError('Invalid token'))

    const promise3 = sut.save((() => {}) as any)
    await expect(promise3).rejects.toThrow(new UnexpectedError('Invalid token'))

    const promise4 = sut.save(1 as any)
    await expect(promise4).rejects.toThrow(new UnexpectedError('Invalid token'))
  })
})
