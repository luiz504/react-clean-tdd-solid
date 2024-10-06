import { mockSurveyModelList } from '~/domain/__test__'
import { FetchSurveys, FetchSurveysModel } from '~/domain/use-cases'

export class FetchSurveysSpy implements FetchSurveys {
  callCount = 0
  surveys = mockSurveyModelList(5)
  async fetch(): Promise<FetchSurveysModel> {
    this.callCount += 1

    return this.surveys
  }
}
