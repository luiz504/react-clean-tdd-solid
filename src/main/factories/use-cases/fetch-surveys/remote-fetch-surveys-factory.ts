import { RemoteFetchSurveys } from '~/data/use-cases/fetch-surveys/remote-fetch-surveys'
import { makeAxiosHttpAdapter } from '../../http/axios-http-adapter-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteFetchSurveys = (): RemoteFetchSurveys => {
  return new RemoteFetchSurveys(
    makeApiUrl('api/surveys').toString(),
    makeAxiosHttpAdapter(),
  )
}
