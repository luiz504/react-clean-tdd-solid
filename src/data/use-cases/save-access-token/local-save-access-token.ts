import { SetStorage } from '~/data/protocols/cache/set-storage'
import { SaveAccessToken } from '~/domain/use-cases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly storage: SetStorage) {}
  async save(accessToken: string): Promise<void> {
    await this.storage.set('accessToken', accessToken)
  }
}
