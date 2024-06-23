import { faker } from '@faker-js/faker'
import { makeApiUrl } from './api-url-factory'
const makeSut = (path = faker.lorem.word(), baseUrl = faker.internet.url()) => {
  vi.stubEnv('VITE_API_BASE_URL', baseUrl)
  const sut = makeApiUrl(path)
  return { sut, baseUrl }
}

describe('Factory: makeApiUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })
  it('should throw if no baseUrl is not valid', () => {
    vi.stubEnv('VITE_API_BASE_URL', '')

    const fakePath = faker.lorem.word()
    expect(() => makeApiUrl(fakePath)).toThrow(new Error('Invalid base URL: '))
  })

  it('should return a valid URL object', () => {
    const path = faker.lorem.word()
    const { sut } = makeSut(path)

    expect(sut).toBeInstanceOf(URL)
  })
  it('should return a valid with slash between baseUrl and path and not duplicate', () => {
    const path = faker.lorem.word()
    const { sut, baseUrl } = makeSut(path)
    if (baseUrl.endsWith('/')) {
      expect(sut.toString()).toBe(`${baseUrl}${path}`)
    } else {
      expect(sut.toString()).toBe(`${baseUrl}/${path}`)
    }
  })
})
