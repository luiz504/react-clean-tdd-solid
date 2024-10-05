import { FC } from 'react'
import { Surveys } from '~/presentation/pages/Surveys'
import { makeRemoteFetchSurveys } from '../../use-cases'

export const MakeSurveys: FC = () => {
  return <Surveys fetchSurveys={makeRemoteFetchSurveys()} />
}
