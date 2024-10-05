import { mockSurveyModelList } from '~/domain/__test__'
import { SurveyModel } from '~/domain/models'
import { FetchSurveys } from '~/domain/use-cases'

export class FetchSurveysSpy implements FetchSurveys {
  callCount = 0
  surveys = mockSurveyModelList(5)
  async fetch(): Promise<SurveyModel[]> {
    this.callCount += 1

    return this.surveys
  }
}
