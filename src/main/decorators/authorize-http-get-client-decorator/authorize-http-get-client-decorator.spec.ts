import {
  GetStorageSpy,
  HttpGetClientSpy,
  mockGetRequest,
} from '~/data/__test__'
import { AuthorizeHttpGetClientDecorator } from '.'
import { faker } from '@faker-js/faker'
import { HttpGetParams } from '~/data/protocols/http'
import { mockAccountModel } from '~/domain/__test__'

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
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = null

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
  it('should add header to HttpGetClient if GetStorage is not null', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    const account = mockAccountModel()

    getStorageSpy.value = JSON.stringify(account)
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toEqual(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': account.accessToken,
    })
  })
  it('should merge headers to HttpGetClient if GetStorage is not null', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    const account = mockAccountModel()

    getStorageSpy.value = JSON.stringify(account)
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        [faker.database.column()]: faker.lorem.word(),
      },
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toEqual(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      ...httpRequest.headers,
      'x-access-token': account.accessToken,
    })
  })

  it('should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual(httpGetClientSpy.response)
  })

  it('should return the same result as HttpGetClient if there is no accessToken', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()

    getStorageSpy.value = JSON.stringify({ 'some value': 'sss' })

    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual(httpGetClientSpy.response)
  })
})
