import { SurveyModel } from '../models'

export type FetchSurveyModel = SurveyModel
export interface FetchSurveys {
  fetch: () => Promise<FetchSurveyModel[]>
}
