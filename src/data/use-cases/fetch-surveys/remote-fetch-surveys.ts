import { HttpGetClient, HttpStatusCode } from '~/data/protocols/http'
import { UnexpectedError } from '~/domain/errors'
import { SurveyAnswerModel } from '~/domain/models'

import {
  FetchSurveys,
  FetchSurveyModel,
} from '~/domain/use-cases/fetch-surveys'

export type RemoteFetchSurveysModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: string
  didAnswer: boolean
}
export class RemoteFetchSurveys implements FetchSurveys {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async fetch(): Promise<FetchSurveyModel[]> {
    const httpResponse = await this.httpGetClient.get<
      RemoteFetchSurveysModel[]
    >({
      url: this.url,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (Array.isArray(httpResponse.body)) {
          return httpResponse.body.map(this.mapToModel)
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

  private mapToModel(item: RemoteFetchSurveysModel): FetchSurveyModel {
    return {
      id: item.id,
      question: item.question,
      answers: item.answers,
      date: new Date(item.date),
      didAnswer: item.didAnswer,
    }
  }
}
