import { faker } from '@faker-js/faker'
import {
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
