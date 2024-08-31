import { SetStorage } from '~/data/protocols/cache/set-storage'
import { UnexpectedError } from '~/domain/errors'
import { AccountModel, accountModelSchema } from '~/domain/models'
import { UpdateCurrentAccount } from '~/domain/use-cases'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly storage: SetStorage) {}
  async save(account: AccountModel): Promise<void> {
    const accountValidation = accountModelSchema.safeParse(account)
    if (!accountValidation.success) throw new UnexpectedError('Invalid account')

    this.storage.set('account', JSON.stringify(account))
  }
}
