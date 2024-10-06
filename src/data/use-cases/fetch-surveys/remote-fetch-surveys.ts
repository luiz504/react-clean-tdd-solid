import { HttpGetClient, HttpStatusCode } from '~/data/protocols/http'
import { UnexpectedError } from '~/domain/errors'

import {
  FetchSurveys,
  FetchSurveysModel,
} from '~/domain/use-cases/fetch-surveys'

type RemoteFetchSurveysModel = FetchSurveysModel
export class RemoteFetchSurveys implements FetchSurveys {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async fetch(): Promise<FetchSurveysModel> {
    const httpResponse = await this.httpGetClient.get<RemoteFetchSurveysModel>({
      url: this.url,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (Array.isArray(httpResponse.body)) {
          return httpResponse.body
        }
        throw new UnexpectedError()
      case HttpStatusCode.noContent:
        return []
      case HttpStatusCode.forbidden:
      case HttpStatusCode.notFound:
      case HttpStatusCode.serverError:
      default:
        throw new UnexpectedError()
    }
  }
}
