import { HttpResponse } from '.'

export type HttpPostParams<T> = {
  url: string
  body?: T
}
export interface HttpPostClient {
  post<T, R>(params: HttpPostParams<T>): Promise<HttpResponse<R>>
  // Make these methods receive headers/signal
}
