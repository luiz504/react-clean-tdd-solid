import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http'
import { EmailInUserError, UnexpectedError } from '~/domain/errors'
import { AccountModel, accountModelSchema } from '~/domain/models'
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
      case HttpStatusCode.ok: {
        const account = accountModelSchema.safeParse(httpResponse.body)
        if (account.success) {
          return account.data
        }

        throw new UnexpectedError()
      }

      case HttpStatusCode.forbidden:
        throw new EmailInUserError()
      default:
        throw new UnexpectedError()
    }
  }
}
