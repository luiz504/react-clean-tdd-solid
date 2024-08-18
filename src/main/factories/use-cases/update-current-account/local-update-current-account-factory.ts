import { LocalUpdateCurrentAccount } from '~/data/use-cases/update-current-account/update-current-account'
import { UpdateCurrentAccount } from '~/domain/use-cases'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
