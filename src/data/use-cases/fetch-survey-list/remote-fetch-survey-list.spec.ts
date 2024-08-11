import { faker } from '@faker-js/faker'
import { HttpGetClientSpy } from '~/data/__test__'
import { RemoteFetchSurveyList } from './remote-fetch-survey-list'
import { HttpStatusCode } from '~/data/protocols/http'
import { UnexpectedError } from '~/domain/errors'

const makeSut = (url = faker.internet.url()) => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteFetchSurveyList(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('RemoteFetchSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.fetch()

    expect(httpGetClientSpy.url).toBe(url)
  })

  it('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }
    const promise = sut.fetch()
    await expect(promise).rejects.toThrow(new UnexpectedError())
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
})
