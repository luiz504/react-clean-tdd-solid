import { HttpPostClientSpy } from '~/data/__test__/mock-http-client'

import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct values', async () => {
    const url = 'any_url'
    const httpClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClientSpy)
    await sut.auth()
    expect(httpClientSpy.url).toBe(url)
  })
})
