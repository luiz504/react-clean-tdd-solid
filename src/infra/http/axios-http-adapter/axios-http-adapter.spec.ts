import { faker } from '@faker-js/faker'
import { AxiosHttpAdapter } from './axios-adapter'
import axios from 'axios'
import { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const makeSut = () => {
  const sut = new AxiosHttpAdapter()
  return { sut }
}

describe('AxiosHttpAdapter', () => {
  it('Should call axios with correct URL and verb', () => {
    const url = faker.internet.url()
    const { sut } = makeSut()

    sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
