import { mockSurveysModel } from '~/domain/__test__'
import { FetchSurveys, FetchSurveyModel } from '~/domain/use-cases'

export class FetchSurveysSpy implements FetchSurveys {
  callCount = 0
  surveys = mockSurveysModel(5)
  async fetch(): Promise<FetchSurveyModel[]> {
    this.callCount += 1

    return this.surveys
  }
}
