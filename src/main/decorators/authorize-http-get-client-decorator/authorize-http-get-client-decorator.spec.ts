import { GetStorageSpy } from '~/data/__test__'
import { AuthorizeHttpGetClientDecorator } from '.'

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    sut.get()
    expect(getStorageSpy.key).toBe('account')
  })
})
