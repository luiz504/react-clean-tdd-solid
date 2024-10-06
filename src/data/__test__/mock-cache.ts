import { faker } from '@faker-js/faker'

import { GetStorage } from '../protocols/cache'

export class GetStorageSpy implements GetStorage {
  key?: string
  value: string | null = JSON.stringify(faker.finance.currency())

  get(key: string): string | null {
    this.key = key
    return this.value
  }
}
