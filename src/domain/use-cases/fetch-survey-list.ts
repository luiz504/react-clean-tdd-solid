import { SurveyModel } from '../models'

export interface FetchSurveyList {
  fetch: () => Promise<SurveyModel[]>
}
