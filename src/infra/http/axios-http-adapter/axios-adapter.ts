import axios, { AxiosError } from 'axios'
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '~/data/protocols/http'

export class AxiosHttpAdapter implements HttpPostClient {
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
}
