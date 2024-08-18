import { faker } from '@faker-js/faker'
import * as Helper from '../../support/http-mocks'
import { AccountModel } from '../../../../../domain/models/account-model'

const InvalidCredentialsError = () =>
  Helper.mockSignInApiCall({
    statusCode: 401,
    body: {
      error: faker.lorem.paragraph(),
    },
  }).as('request')

const UnexpectedError = () =>
  Helper.mockSignInApiCall({
    statusCode: faker.number.int({ min: 402, max: 600 }),
  }).as('request')

const SuccessWithInvalidData = () =>
  Helper.mockSignInApiCall({
    statusCode: 200,
    body: {
      xxx: faker.location.country(),
    },
  }).as('request')

const Success = () =>
  Helper.mockSignInApiCall({
    statusCode: 200,
    body: {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    } satisfies AccountModel,
  }).as('request')

export const AuthenticateMocks = {
  InvalidCredentialsError,
  UnexpectedError,
  SuccessWithInvalidData,
  Success,
}
