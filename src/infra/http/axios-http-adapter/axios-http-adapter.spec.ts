import { faker } from '@faker-js/faker'
import { AxiosHttpAdapter } from './axios-adapter'
import axios from 'axios'
import { Mocked } from 'vitest'
import { HttpPostParams } from '~/data/protocols/http'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const makeSut = () => {
  const sut = new AxiosHttpAdapter()
  return { sut }
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.finance.currency(),
})

describe('AxiosHttpAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('Should call axios with correct values', () => {
    const mockedAxiosResult = {
      status: faker.number.int(),
      data: faker.finance.currency(),
    }
    mockedAxios.post.mockResolvedValue(mockedAxiosResult)
    const { sut } = makeSut()
    const request = mockPostRequest()
    sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('Should return the correct statusCode and body', async () => {
    const mockedAxiosResult = {
      status: faker.number.int(),
      data: faker.finance.currency(),
    }
    mockedAxios.post.mockResolvedValue(mockedAxiosResult)
    const { sut } = makeSut()
    const httpResponse = await sut.post(mockPostRequest())

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    })
  })
})
