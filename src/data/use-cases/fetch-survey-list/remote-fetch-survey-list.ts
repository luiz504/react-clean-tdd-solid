import { HttpGetClient } from '~/data/protocols/http'
import { SurveyModel } from '~/domain/models'
import { FetchSurveyList } from '~/domain/use-cases/fetch-survey-list'

export class RemoteFetchSurveyList implements FetchSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async fetch(): Promise<SurveyModel[]> {
    await this.httpGetClient.get({
      url: this.url,
    })

    return []
  }
}
