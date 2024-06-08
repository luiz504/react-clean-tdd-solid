import { faker } from '@faker-js/faker'
import { HttpPostClientSpy } from '~/data/__test__/mock-http-client'

import { RemoteAuthentication } from './remote-authentication'
import { mockAuthentication } from '~/domain/__test__/mock-authentication'

const makeSut = (url: string = faker.internet.url()) => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })
  it('should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const credentials = mockAuthentication()
    await sut.auth(credentials)
    expect(httpPostClientSpy.body).toEqual(credentials)
  })
})
