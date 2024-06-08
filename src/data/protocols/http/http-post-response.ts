export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  ok = 200,
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
