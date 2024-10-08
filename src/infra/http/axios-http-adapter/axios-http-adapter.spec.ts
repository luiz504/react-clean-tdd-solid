import { faker } from '@faker-js/faker'
import { AxiosError } from 'axios'

import { mockGetRequest, mockPostRequest } from '~/data/__test__'
import { mockAxios, mockHttpResponse } from '~/infra/__test__'

import { HttpStatusCode } from '~/data/protocols/http'

import { AxiosHttpAdapter } from './axios-adapter'

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
  describe('post', () => {
    it('Should call axios.post with correct values', () => {
      const { sut, mockedAxios } = makeSut()

      const request = mockPostRequest()
      sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })
    it('Should return correct response on axios.post', async () => {
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
    it('should return correct response on Failure without response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.post.mockRejectedValueOnce(new Error())

      const promise = await sut.post(mockPostRequest())

      expect(promise).toEqual({
        statusCode: HttpStatusCode.serverError,
      })
    })
    it('should return correct response on Failure with AxiosResponse on axios.post', async () => {
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
  describe('get', () => {
    it('Should call axios.get with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockGetRequest()

      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, {
        headers: request.headers,
      })
    })
    it('Should return correct response on axios.get', async () => {
      const mockedAxiosResult = {
        status: faker.number.int(),
        data: faker.finance.currency(),
      }
      const { sut, mockedAxios } = makeSut()
      mockedAxios.get.mockResolvedValue(mockedAxiosResult)

      const httpResponse = await sut.get(mockGetRequest())

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data,
      })
    })
    it('should return correct response on Failure without response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.get.mockRejectedValueOnce(new Error())

      const promise = await sut.get(mockGetRequest())

      expect(promise).toEqual({
        statusCode: HttpStatusCode.serverError,
      })
    })
    it('should return correct response on Failure with AxiosResponse on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()

      const mockedErrorResponse = mockHttpResponse()

      // Create AxiosError
      const axiosError = new AxiosError('any_message', 'any_code')

      // Manually set the response property
      axiosError.response = {
        status: mockedErrorResponse.status,
        data: mockedErrorResponse.data,
      } as any

      mockedAxios.get.mockRejectedValueOnce(axiosError)

      const promise = await sut.get(mockGetRequest())
      expect(promise).toEqual({
        statusCode: mockedErrorResponse.status,
        body: mockedErrorResponse.data,
      })
    })
  })
})
