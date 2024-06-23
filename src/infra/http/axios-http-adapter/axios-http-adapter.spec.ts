import { faker } from '@faker-js/faker'

import { mockPostRequest } from '~/data/__test__'

import { mockAxios, mockHttpResponse } from '~/infra/__test__'

import { AxiosHttpAdapter } from './axios-adapter'
import { AxiosError } from 'axios'
import { HttpStatusCode } from '~/data/protocols/http'

vi.mock('axios')

const makeSut = () => {
  const sut = new AxiosHttpAdapter()
  const { mockedAxios } = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('Should call axios with correct values', () => {
    const { sut, mockedAxios } = makeSut()

    const request = mockPostRequest()
    sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('Should return the correct statusCode and body', async () => {
    const mockedAxiosResult = {
      status: faker.number.int(),
      data: faker.finance.currency(),
    }
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockResolvedValue(mockedAxiosResult)

    const httpResponse = await sut.post(mockPostRequest())

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    })
  })
  it('should return the correct statusCode and body on Failure without response', async () => {
    const { sut, mockedAxios } = makeSut()

    mockedAxios.post.mockRejectedValueOnce(new Error())

    const promise = await sut.post(mockPostRequest())

    expect(promise).toEqual({
      statusCode: HttpStatusCode.serverError,
    })
  })
  it('should return the correct statusCode and body on Failure with response', async () => {
    const { sut, mockedAxios } = makeSut()

    const mockedErrorResponse = mockHttpResponse()

    // Create AxiosError
    const axiosError = new AxiosError('any_message', 'any_code')

    // Manually set the response property
    axiosError.response = {
      status: mockedErrorResponse.status,
      data: mockedErrorResponse.data,
    } as any

    mockedAxios.post.mockRejectedValueOnce(axiosError)

    const promise = await sut.post(mockPostRequest())
    expect(promise).toEqual({
      statusCode: mockedErrorResponse.status,
      body: mockedErrorResponse.data,
    })
  })
})
