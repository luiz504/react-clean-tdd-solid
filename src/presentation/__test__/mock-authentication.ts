import { mockAccountModel } from '~/domain/__test__'

import {
  Authentication,
  AuthenticationModel,
  AuthenticationParams,
} from '~/domain/use-cases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params?: AuthenticationParams
  callsCount = 0
  async auth(params: AuthenticationParams): Promise<AuthenticationModel> {
    this.params = params
    this.callsCount += 1
    return this.account
  }
}
