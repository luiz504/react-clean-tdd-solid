import { Authentication } from '~/domain/use-cases'
import { RemoteAuthentication } from '~/data/use-cases/authentication/remote-authentication'
import { makeAxiosHttpAdapter } from '../../http/axios-http-adapter-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(
    makeApiUrl('/api/login').toString(),
    makeAxiosHttpAdapter(),
  )
}
