import { faker } from '@faker-js/faker'

import { HttpGetClientSpy } from '~/data/__test__'
import { HttpStatusCode } from '~/data/protocols/http'
import { mockRemoteSurveysModel } from '~/data/__test__/mock-remote-surveys'

import { RemoteFetchSurveys } from './remote-fetch-surveys'
import { AccessDeniedError, UnexpectedError } from '~/domain/errors'

const makeSut = (url = faker.internet.url()) => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteFetchSurveys(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('RemoteFetchSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveysModel(),
    }
    await sut.fetch()

    expect(httpGetClientSpy.url).toBe(url)
  })

  it('should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }
    const promise = sut.fetch()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }
    const promise = sut.fetch()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }
    const promise = sut.fetch()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpGetClient returns success with invalid data', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = undefined
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    const promise = sut.fetch()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a SurveyModelsModel if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteSurveysModel(2)
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    // Act
    const surveys = await sut.fetch()

    // Assert
    expect(surveys).toEqual([
      { ...httpResult[0], date: new Date(httpResult[0].date) },
      { ...httpResult[1], date: new Date(httpResult[1].date) },
    ])
  })

  it('should return a empty list if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }
    // Act
    const surveys = await sut.fetch()

    // Assert
    expect(surveys).toEqual([])
  })
})
