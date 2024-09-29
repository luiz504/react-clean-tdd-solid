import { ZodError } from 'zod'
import {
  InvalidResourceFormatError,
  ResourceNotFoundError,
  UnexpectedError,
} from '~/domain/errors'
import { AccountModel, accountModelSchema } from '~/domain/models'
import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  const safeParse = accountModelSchema.safeParse(account)
  if (!safeParse.success) {
    throw new InvalidResourceFormatError()
  }
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  const accountStored = makeLocalStorageAdapter().get('account')
  if (!accountStored) {
    throw new ResourceNotFoundError()
  }
  try {
    const parsed = JSON.parse(accountStored)
    const account = accountModelSchema.parse(parsed)

    return account
  } catch (err) {
    if (err instanceof ZodError) {
      throw new InvalidResourceFormatError()
    }

    throw new UnexpectedError()
  }
}
