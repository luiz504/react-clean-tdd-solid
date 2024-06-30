import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http'
import { EmailInUserError, UnexpectedError } from '~/domain/errors'
import { AccountModel } from '~/domain/models'
import { RegisterAccount, RegisterAccountParams } from '~/domain/use-cases'

export class RemoteRegisterAccount implements RegisterAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async register(params: RegisterAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post<
      RegisterAccountParams,
      AccountModel
    >({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (httpResponse.body?.accessToken) {
          return { accessToken: httpResponse.body.accessToken }
        }
        throw new UnexpectedError()

      case HttpStatusCode.forbidden:
        throw new EmailInUserError()
      default:
        throw new UnexpectedError()
    }
  }
}
