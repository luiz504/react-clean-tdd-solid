import { HttpPostClient } from '~/data/protocols/http'
import { AccountModel } from '~/domain/models'
import { RegisterAccount, RegisterAccountParams } from '~/domain/use-cases'

export class RemoteRegisterAccount implements RegisterAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async register(params: RegisterAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post<RegisterAccountParams, AccountModel>({
      url: this.url,
      body: params,
    })
    return { accessToken: 'any_token' }
  }
}
