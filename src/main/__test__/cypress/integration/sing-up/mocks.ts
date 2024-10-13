import { faker } from '@faker-js/faker'
import { HTTP } from '../../support/http-mocks'
import { AccountModel } from '../../../../../domain/models/account-model'
const EmailInUseError = () =>
  HTTP.mockHttpRequest('POST', /signup/, {
    statusCode: 403,
    body: {
      error: faker.lorem.paragraph(),
    },
  }).as('request')

const UnexpectedError = () =>
  HTTP.mockHttpRequest('POST', /signup/, {
    statusCode: faker.number.int({ min: 404, max: 600 }),
  }).as('request')

const SuccessWithInvalidData = () =>
  HTTP.mockHttpRequest('POST', /signup/, {
    statusCode: 200,
    body: {
      xxx: faker.location.country(),
    },
  }).as('request')

const Success = () =>
  HTTP.mockHttpRequest('POST', /signup/, {
    statusCode: 200,
    body: {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    } satisfies AccountModel,
  }).as('request')

export const AuthenticateMocks = {
  EmailInUseError,
  UnexpectedError,
  SuccessWithInvalidData,
  Success,
}
