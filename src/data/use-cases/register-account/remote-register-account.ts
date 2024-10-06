import { HttpPostClient, HttpStatusCode } from '~/data/protocols/http'
import { EmailInUserError, UnexpectedError } from '~/domain/errors'

import {
  RegisterAccount,
  RegisterAccountModel,
  RegisterAccountParams,
  registerAccountModelSchema,
} from '~/domain/use-cases'

type RemoteRegisterAccountModel = RegisterAccountModel
export class RemoteRegisterAccount implements RegisterAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async register(params: RegisterAccountParams): Promise<RegisterAccountModel> {
    const httpResponse = await this.httpPostClient.post<
      RegisterAccountParams,
      RemoteRegisterAccountModel
    >({
      url: this.url,
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const account = registerAccountModelSchema.safeParse(httpResponse.body)
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
