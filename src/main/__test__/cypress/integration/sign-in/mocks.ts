import { faker } from '@faker-js/faker'
import { HTTP } from '../../support/http-mocks'
import { AuthenticationModel } from '../../../../../domain/use-cases/authentication'

const InvalidCredentialsError = () =>
  HTTP.mockHttpRequest('POST', /login/, {
    statusCode: 401,
    body: {
      error: faker.lorem.paragraph(),
    },
  }).as('request')

const UnexpectedError = () =>
  HTTP.mockHttpRequest('POST', /login/, {
    statusCode: faker.number.int({ min: 402, max: 600 }),
  }).as('request')

const SuccessWithInvalidData = () =>
  HTTP.mockHttpRequest('POST', /login/, {
    statusCode: 200,
    body: {
      xxx: faker.location.country(),
    },
  }).as('request')

const Success = () =>
  HTTP.mockHttpRequest('POST', /login/, {
    statusCode: 200,
    body: {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    } satisfies AuthenticationModel,
  }).as('request')

export const AuthenticateMocks = {
  InvalidCredentialsError,
  UnexpectedError,
  SuccessWithInvalidData,
  Success,
}
