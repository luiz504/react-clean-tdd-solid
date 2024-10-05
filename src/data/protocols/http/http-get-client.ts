import { HttpResponse } from './http-response'

export type HttpGetParams = {
  url: string
  headers?: Record<string, string>
}
export interface HttpGetClient {
  get: <R>(params: HttpGetParams) => Promise<HttpResponse<R>>
}
