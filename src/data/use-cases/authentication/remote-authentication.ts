import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http'

import { InvalidCredentialsError, UnexpectedError } from '~/domain/errors'
import { AccountModel } from '~/domain/models'
import { Authentication, AuthenticationParams } from '~/domain/use-cases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const HttpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok: {
        if (HttpResponse.body?.accessToken) {
          return { accessToken: HttpResponse.body.accessToken }
        }
        throw new UnexpectedError()
      }
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
