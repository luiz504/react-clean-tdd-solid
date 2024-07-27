import { faker } from '@faker-js/faker'
import * as Helper from '../../support/http-mocks'

const EmailInUseError = () =>
  Helper.mockSignUpApiCall({
    statusCode: 403,
    body: {
      error: faker.lorem.paragraph(),
    },
  }).as('request')

const UnexpectedError = () =>
  Helper.mockSignUpApiCall({
    statusCode: faker.number.int({ min: 404, max: 600 }),
  }).as('request')

const SuccessWithInvalidData = () =>
  Helper.mockSignUpApiCall({
    statusCode: 200,
    body: {
      xxx: faker.location.country(),
    },
  }).as('request')

const Success = () =>
  Helper.mockSignUpApiCall({
    statusCode: 200,
    body: {
      accessToken: faker.string.uuid(),
    },
  }).as('request')

export const AuthenticateMocks = {
  EmailInUseError,
  UnexpectedError,
  SuccessWithInvalidData,
  Success,
}
