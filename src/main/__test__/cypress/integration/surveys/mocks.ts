import { faker } from '@faker-js/faker'
import { HTTP } from '../../helpers/http-mocks'

const path = /surveys/
const mockUnexpectedError = () =>
  HTTP.mockServerError('GET', path, faker.number.int({ min: 404, max: 600 }))

const mockAccessDeniedError = () => {
  HTTP.mockForbiddenError('GET', path)
}
export const SurveysMocks = { mockUnexpectedError, mockAccessDeniedError }
