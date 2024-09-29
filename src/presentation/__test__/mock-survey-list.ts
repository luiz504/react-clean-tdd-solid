import { mockSurveyModelList } from '~/domain/__test__'
import { SurveyModel } from '~/domain/models'
import { FetchSurveyList } from '~/domain/use-cases'

export class FetchSurveyListSpy implements FetchSurveyList {
  callCount = 0
  surveys = mockSurveyModelList(5)
  async fetch(): Promise<SurveyModel[]> {
    this.callCount += 1

    return this.surveys
  }
}
