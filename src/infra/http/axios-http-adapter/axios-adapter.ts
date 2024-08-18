import axios, { AxiosError, AxiosResponse } from 'axios'
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

      return this.adaptResponse(response)
    } catch (err) {
      return this.adaptError(err)
    }
  }

  async get<R>(params: HttpGetParams): Promise<HttpResponse<R>> {
    try {
      const response = await axios.get(params.url)

      return this.adaptResponse(response)
    } catch (err) {
      return this.adaptError(err)
    }
  }

  private adaptResponse(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }

  private adaptError(err: unknown): HttpResponse {
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
