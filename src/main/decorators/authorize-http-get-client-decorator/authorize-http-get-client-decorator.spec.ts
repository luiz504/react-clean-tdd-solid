import {
  GetStorageSpy,
  HttpGetClientSpy,
  mockGetRequest,
} from '~/data/__test__'
import { AuthorizeHttpGetClientDecorator } from '.'
import { faker } from '@faker-js/faker'
import { HttpGetParams } from '~/data/protocols/http'

const makeSut = () => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy,
  )
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy,
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
  it('should not add header if GetStorage returns null', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        [faker.database.column()]: faker.lorem.word(),
      },
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })
})
