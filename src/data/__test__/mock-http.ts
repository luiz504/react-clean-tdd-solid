import { faker } from '@faker-js/faker'
import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '../protocols/http'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  response: HttpResponse<any> = {
    statusCode: HttpStatusCode.ok,
  }

  async post<T, R>(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.finance.currency(),
})

export class HttpGetClientSpy implements HttpGetClient {
  url?: string
  response: HttpResponse<any> = {
    statusCode: HttpStatusCode.ok,
  }

  async get<R = any>(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    return this.response
  }
}
export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: Object.fromEntries(
    faker.helpers.multiple(
      () => [faker.database.column(), faker.lorem.word()],
      { count: 3 },
    ),
  ),
})
