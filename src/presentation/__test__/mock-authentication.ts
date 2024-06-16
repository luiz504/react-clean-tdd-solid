import { mockAccountModel } from '~/domain/__test__'
import { AccountModel } from '~/domain/models'
import { Authentication, AuthenticationParams } from '~/domain/use-cases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params?: AuthenticationParams
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
