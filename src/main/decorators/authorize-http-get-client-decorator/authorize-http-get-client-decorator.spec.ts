import { GetStorageSpy } from '~/data/__test__'
import { AuthorizeHttpGetClientDecorator } from '.'

const makeSut = () => {
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
  return {
    sut,
    getStorageSpy,
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    sut.get()
    expect(getStorageSpy.key).toBe('account')
  })
})
