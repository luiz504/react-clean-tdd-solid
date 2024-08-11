import { faker } from '@faker-js/faker'
import { HttpGetClientSpy } from '~/data/__test__'
import { RemoteFetchSurveyList } from './remote-fetch-survey-list'

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
})
