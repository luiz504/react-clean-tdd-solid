import { HttpResponse } from './http-response'

export type HttpGetParams = {
  url: string
}
export interface HttpGetClient {
  get: <R>(params: HttpGetParams) => Promise<HttpResponse<R>>
}
