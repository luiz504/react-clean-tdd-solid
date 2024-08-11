import { HttpGetClient, HttpStatusCode } from '~/data/protocols/http'
import { UnexpectedError } from '~/domain/errors'
import { SurveyModel } from '~/domain/models'
import { FetchSurveyList } from '~/domain/use-cases/fetch-survey-list'

export class RemoteFetchSurveyList implements FetchSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async fetch(): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get<SurveyModel[]>({
      url: this.url,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body || []

      case HttpStatusCode.forbidden:
      default:
        throw new UnexpectedError()
    }
  }
}
