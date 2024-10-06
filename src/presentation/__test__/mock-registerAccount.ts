import { mockAccountModel } from '~/domain/__test__'

import {
  RegisterAccount,
  RegisterAccountModel,
  RegisterAccountParams,
} from '~/domain/use-cases'

export class RegisterAccountSpy implements RegisterAccount {
  account = mockAccountModel()
  params?: RegisterAccountParams
  callsCount = 0
  async register(params: RegisterAccountParams): Promise<RegisterAccountModel> {
    this.params = params
    this.callsCount += 1
    return this.account
  }
}
