import { InvalidResourceFormatError } from '~/domain/errors'
import { AccountModel, accountModelSchema } from '~/domain/models'
import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (
  account: AccountModel | null,
): void => {
  if (!account) {
    makeLocalStorageAdapter().set('account', null)
    return
  }
  const safeParse = accountModelSchema.safeParse(account)
  if (!safeParse.success) {
    throw new InvalidResourceFormatError()
  }
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel | null => {
  const accountStored = makeLocalStorageAdapter().get('account')
  if (!accountStored) {
    return null
  }
  try {
    const parsed = JSON.parse(accountStored)
    const account = accountModelSchema.parse(parsed)

    return account
  } catch {
    return null
  }
}
