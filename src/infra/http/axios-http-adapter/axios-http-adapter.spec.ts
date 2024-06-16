import { faker } from '@faker-js/faker'

import { mockPostRequest } from '~/data/__test__'

import { mockAxios } from '~/infra/__test__'

import { AxiosHttpAdapter } from './axios-adapter'

vi.mock('axios')

const makeSut = () => {
  const sut = new AxiosHttpAdapter()
  const { mockedAxios } = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpAdapter', () => {
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
})
