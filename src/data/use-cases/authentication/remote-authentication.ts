import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http'

import { InvalidCredentialsError, UnexpectedError } from '~/domain/errors'
import { AccountModel, accountModelSchema } from '~/domain/models'
import { Authentication, AuthenticationParams } from '~/domain/use-cases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post<
      AuthenticationParams,
      AccountModel
    >({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const account = accountModelSchema.safeParse(httpResponse.body)
        if (account.success) {
          return account.data
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
