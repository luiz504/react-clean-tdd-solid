import { Storage } from '~/data/protocols/cache/storage'
import { SaveAccessToken } from '~/domain/use-cases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly storage: Storage) {}
  async save(accessToken: string): Promise<void> {
    await this.storage.set('accessToken', accessToken)
  }
}
