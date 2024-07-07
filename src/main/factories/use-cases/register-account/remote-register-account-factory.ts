import { RegisterAccount } from '~/domain/use-cases'

import { makeAxiosHttpAdapter } from '../../http/axios-http-adapter-factory'
import { makeApiUrl } from '../../http/api-url-factory'
import { RemoteRegisterAccount } from '~/data/use-cases/register-account/remote-register-account'

export const makeRemoteRegisterAccount = (): RegisterAccount => {
  return new RemoteRegisterAccount(
    makeApiUrl('/api/signup').toString(),
    makeAxiosHttpAdapter(),
  )
}
