import { SurveyModel } from '../models'

export type FetchSurveysModel = SurveyModel[]
export interface FetchSurveys {
  fetch: () => Promise<FetchSurveysModel>
}
