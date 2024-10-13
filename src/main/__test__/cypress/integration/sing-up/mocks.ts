import { faker } from '@faker-js/faker'
import { HTTP } from '../../helpers/http-mocks'

const path = /signup/
const EmailInUseError = () => HTTP.mockForbiddenError('POST', path)

const UnexpectedError = () =>
  HTTP.mockServerError('POST', path, faker.number.int({ min: 404, max: 600 }))

const SuccessWithInvalidData = () =>
  HTTP.mockOk('POST', path, 'fx:invalid-account')

const Success = () => HTTP.mockOk('POST', path, 'fx:account')

export const AuthenticateMocks = {
  EmailInUseError,
  UnexpectedError,
  SuccessWithInvalidData,
  Success,
}
