import { HttpResponse } from '.'

export type HttpPostParams<Body> = {
  url: string
  body?: Body
}
export interface HttpPostClient {
  post<Body, Response>(
    params: HttpPostParams<Body>,
  ): Promise<HttpResponse<Response>>
  // Make these methods receive headers/signal
}
