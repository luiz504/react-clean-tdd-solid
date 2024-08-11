import { faker } from '@faker-js/faker'
import { HttpGetClientSpy } from '~/data/__test__'
import { RemoteFetchSurveyList } from './remote-fetch-survey-list'

describe('RemoteFetchSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteFetchSurveyList(url, httpGetClientSpy)
    await sut.fetch()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
