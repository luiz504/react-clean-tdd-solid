import axios from 'axios'
import { Mocked } from 'vitest'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = () => ({
  status: faker.number.int(),
  data: faker.finance.currency(),
})
export const mockAxios = () => {
  const mockedAxios = axios as Mocked<typeof axios>
  mockedAxios.request.mockResolvedValue(mockHttpResponse())

  return { mockedAxios }
}
