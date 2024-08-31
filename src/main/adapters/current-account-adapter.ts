import { UnexpectedError } from '~/domain/errors'
import { AccountModel, accountModelSchema } from '~/domain/models'
import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  const safeParse = accountModelSchema.safeParse(account)
  if (!safeParse.success) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('account', account)
}
