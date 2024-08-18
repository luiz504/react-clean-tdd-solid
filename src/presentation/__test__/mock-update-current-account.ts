import { AccountModel } from '~/domain/models'
import { UpdateCurrentAccount } from '~/domain/use-cases'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account?: AccountModel
  async save(account: AccountModel): Promise<void> {
    this.account = account
  }
}
