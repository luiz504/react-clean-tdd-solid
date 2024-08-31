import { faker } from '@faker-js/faker'
import { StorageMock } from '~/data/__test__'
import { LocalUpdateCurrentAccount } from './update-current-account'
import { UnexpectedError } from '~/domain/errors'
import { mockAccountModel } from '~/domain/__test__'

const makeSut = () => {
  const storageMock = new StorageMock()
  const sut = new LocalUpdateCurrentAccount(storageMock)
  return { sut, storageMock }
}

describe('LocalUpdateCurrentAccount', () => {
  it('should call Storage.save with correct values', async () => {
    const { storageMock, sut } = makeSut()

    const account = mockAccountModel()
    await sut.save(account)

    expect(storageMock.key).toBe('account')
    expect(storageMock.value).toBe(JSON.stringify(account))
  })
  it('should throw if Storage.save throws', async () => {
    const { storageMock, sut } = makeSut()

    vi.spyOn(storageMock, 'set').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.save(mockAccountModel())

    await expect(promise).rejects.toThrow(new Error())
  })
  it('should throw if account is invalid', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined as any)
    await expect(promise).rejects.toThrow(
      new UnexpectedError('Invalid account'),
    )

    const promise2 = sut.save(null as any)
    await expect(promise2).rejects.toThrow(
      new UnexpectedError('Invalid account'),
    )

    const promise3 = sut.save('' as any)
    await expect(promise3).rejects.toThrow(
      new UnexpectedError('Invalid account'),
    )

    const promise4 = sut.save(0 as any)
    await expect(promise4).rejects.toThrow(
      new UnexpectedError('Invalid account'),
    )
    const promise5 = sut.save({
      accessToken: faker.number.int(),
      name: faker.number.int(),
    } as any)
    await expect(promise5).rejects.toThrow(
      new UnexpectedError('Invalid account'),
    )
  })
})
