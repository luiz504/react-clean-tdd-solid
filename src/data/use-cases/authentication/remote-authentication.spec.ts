import { faker } from '@faker-js/faker'
import { HttpPostClientSpy } from '~/data/__test__/mock-http-client'
import { HttpStatusCode } from '~/data/protocols/http/http-post-response'

import {
  mockAccountModel,
  mockAuthentication,
} from '~/domain/__test__/mock-account'
import { InvalidCredentialsError } from '~/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '~/domain/errors/unexpected-error'
import { AuthenticationParams } from '~/domain/use-cases/authentication'
import { AccountModel } from '~/domain/models/account-model'

import { RemoteAuthentication } from './remote-authentication'

const makeSut = (url: string = faker.internet.url()) => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >()
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
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }

    const credentials = mockAuthentication()
    await sut.auth(credentials)
    expect(httpPostClientSpy.url).toBe(url)
    expect(httpPostClientSpy.body).toEqual(credentials)
  })

  it('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    }
    const promise = sut.auth(mockAuthentication())
    await expect(() => promise).rejects.toThrow(new InvalidCredentialsError())
  })
  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }
    const promise = sut.auth(mockAuthentication())
    await expect(() => promise).rejects.toThrow(new UnexpectedError())
  })
  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }
    const promise = sut.auth(mockAuthentication())
    await expect(() => promise).rejects.toThrow(new UnexpectedError())
  })
  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }
    const promise = sut.auth(mockAuthentication())
    await expect(() => promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an AccountModel if HttpClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
