import { faker } from '@faker-js/faker'
import { HTTP } from '../../helpers/http-mocks'

const path = /login/
const InvalidCredentialsError = () => HTTP.mockUnauthorizedError('POST', path)

const UnexpectedError = () =>
  HTTP.mockServerError('POST', path, faker.number.int({ min: 402, max: 600 }))

const SuccessWithInvalidData = () =>
  HTTP.mockOk('POST', path, 'fx:invalid-account')

const Success = () => HTTP.mockOk('POST', path, 'fx:account')

export const AuthenticateMocks = {
  InvalidCredentialsError,
  UnexpectedError,
  SuccessWithInvalidData,
  Success,
}
