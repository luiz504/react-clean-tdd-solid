import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http'

import { InvalidCredentialsError, UnexpectedError } from '~/domain/errors'

import {
  Authentication,
  AuthenticationModel,
  AuthenticationParams,
  authenticationParamsSchema,
} from '~/domain/use-cases'

type RemoteAuthenticationModel = AuthenticationModel

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams): Promise<AuthenticationModel> {
    const httpResponse = await this.httpPostClient.post<
      AuthenticationParams,
      RemoteAuthenticationModel
    >({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const account = authenticationParamsSchema.safeParse(httpResponse.body)
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
