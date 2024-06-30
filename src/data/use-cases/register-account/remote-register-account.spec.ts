import { faker } from '@faker-js/faker'
import { HttpPostClientSpy } from '~/data/__test__'
import { RemoteRegisterAccount } from './remote-register-account'
import { mockAccountModel, mockRegisterAccountParams } from '~/domain/__test__'
import { HttpStatusCode } from '~/data/protocols/http'
import { EmailInUserError } from '~/domain/errors'

const makeSut = (url: string = faker.internet.url()) => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteRegisterAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy,
  }
}

describe('RemoteRegisterAccount', () => {
  it('should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    const account = mockRegisterAccountParams()
    await sut.register(account)
    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toEqual(account)
  })
  it('should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }
    const promise = sut.register(mockRegisterAccountParams())
    await expect(() => promise).rejects.toThrow(new EmailInUserError())
  })
})
