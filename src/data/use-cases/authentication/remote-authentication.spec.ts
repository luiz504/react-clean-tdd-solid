import { faker } from '@faker-js/faker'
import { HttpPostClientSpy } from '~/data/__test__/mock-http-client'

import { RemoteAuthentication } from './remote-authentication'

const makeSut = (url: string = faker.internet.url()) => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
