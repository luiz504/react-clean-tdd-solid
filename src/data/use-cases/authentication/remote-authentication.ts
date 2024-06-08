import { HttpPostClient } from '~/data/protocols/http/http-post-client'
import { HttpStatusCode } from '~/data/protocols/http/http-post-response'
import { InvalidCredentialsError } from '~/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '~/domain/errors/unexpected-error'
import { AccountModel } from '~/domain/models/account-model'
import { AuthenticationParams } from '~/domain/use-cases/authentication'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const HttpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
