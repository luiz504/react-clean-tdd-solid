import { faker } from '@faker-js/faker'
import { AxiosHttpAdapter } from './axios-adapter'
import axios from 'axios'
import { Mocked } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('AxiosHttpAdapter', () => {
  it('Should call axios with correct URL', () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpAdapter()

    sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
