import { faker } from '@faker-js/faker'
import { AuthenticationParams } from '../use-cases/authentication'
import { AccountModel } from '../models/account-model'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
})
