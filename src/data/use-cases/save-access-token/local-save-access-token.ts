import { SetStorage } from '~/data/protocols/cache/set-storage'
import { UnexpectedError } from '~/domain/errors'
import { SaveAccessToken } from '~/domain/use-cases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly storage: SetStorage) {}
  async save(accessToken: string): Promise<void> {
    if (!accessToken) throw new UnexpectedError('Access token is required')
    if (typeof accessToken !== 'string')
      throw new UnexpectedError('Invalid token')
    await this.storage.set('accessToken', accessToken)
  }
}
