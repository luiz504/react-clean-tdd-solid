import { RemoteFetchSurveys } from '~/data/use-cases/fetch-surveys/remote-fetch-surveys'
import { makeApiUrl } from '../../http/api-url-factory'
import { makeAuthorizeHttpGetClientDecorator } from '../decorators'

export const makeRemoteFetchSurveys = (): RemoteFetchSurveys => {
  return new RemoteFetchSurveys(
    makeApiUrl('api/surveys').toString(),
    makeAuthorizeHttpGetClientDecorator(),
  )
}
