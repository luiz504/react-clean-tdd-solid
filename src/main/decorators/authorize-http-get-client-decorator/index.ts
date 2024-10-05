import { GetStorage } from '~/data/protocols/cache'
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from '~/data/protocols/http'
import { AccountModel } from '~/domain/models'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse> {
    try {
      const storedAccount = this.getStorage.get('account')

      if (storedAccount) {
        const account: AccountModel = JSON.parse(storedAccount)

        if (!account.accessToken) {
          throw new Error('Access token not found in account')
        }

        return this.httpGetClient.get({
          url: params.url,
          headers: { ...params.headers, 'x-access-token': account.accessToken },
        })
      }
      return this.httpGetClient.get(params)
    } catch {
      return this.httpGetClient.get(params)
    }
  }
}
