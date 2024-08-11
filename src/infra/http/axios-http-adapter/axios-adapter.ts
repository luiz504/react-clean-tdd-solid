import axios, { AxiosError } from 'axios'
import {
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '~/data/protocols/http'

export class AxiosHttpAdapter implements HttpPostClient, HttpPostClient {
  async post<T, R>(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    try {
      const response = await axios.post(params.url, params.body)

      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        return {
          statusCode: err.response.status,
          body: err.response.data,
        }
      }
      return {
        statusCode: HttpStatusCode.serverError,
      }
    }
  }

  async get<R>(params: HttpGetParams): Promise<HttpResponse<R>> {
    try {
      const response = await axios.get(params.url)

      return {
        statusCode: response.status,
        body: response.data,
      }
    } catch (err) {
      return {
        statusCode: HttpStatusCode.serverError,
      }
    }
  }
}
