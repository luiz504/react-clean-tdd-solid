import { faker } from '@faker-js/faker'
import { HTTP } from '../../helpers/http-mocks'

const path = /surveys/
const UnexpectedError = () =>
  HTTP.mockServerError('GET', path, faker.number.int({ min: 404, max: 600 }))

const AccessDeniedError = () => {
  HTTP.mockForbiddenError('GET', path)
}

const Success = () => HTTP.mockOk('GET', path, 'fx:surveys')

export const SurveysMocks = { UnexpectedError, AccessDeniedError, Success }
