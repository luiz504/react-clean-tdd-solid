import axios from 'axios'
import { Mocked } from 'vitest'
import { faker } from '@faker-js/faker'

export const mockAxios = () => {
  const mockedAxios = axios as Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
    status: faker.number.int(),
    data: faker.finance.currency(),
  })

  return { mockedAxios }
}
