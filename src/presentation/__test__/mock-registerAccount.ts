import { mockAccountModel } from '~/domain/__test__'
import { AccountModel } from '~/domain/models'
import { RegisterAccount, RegisterAccountParams } from '~/domain/use-cases'

export class RegisterAccountSpy implements RegisterAccount {
  account = mockAccountModel()
  params?: RegisterAccountParams
  callsCount = 0
  async register(params: RegisterAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount += 1
    return this.account
  }
}
