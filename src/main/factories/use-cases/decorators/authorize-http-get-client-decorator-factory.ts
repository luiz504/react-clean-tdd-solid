import { HttpGetClient } from '~/data/protocols/http'
import { AuthorizeHttpGetClientDecorator } from '~/main/decorators'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'
import { makeAxiosHttpAdapter } from '../../http/axios-http-adapter-factory'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpAdapter(),
  )
}
