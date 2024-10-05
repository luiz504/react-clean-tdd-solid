import { SurveyModel } from '../models'

export interface FetchSurveys {
  fetch: () => Promise<SurveyModel[]>
}
