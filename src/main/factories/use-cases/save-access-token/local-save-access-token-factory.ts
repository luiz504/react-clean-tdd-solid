import { LocalSaveAccessToken } from '~/data/use-cases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '~/domain/use-cases'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
