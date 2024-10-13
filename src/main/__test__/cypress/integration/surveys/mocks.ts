import { faker } from '@faker-js/faker'
import { HTTP } from '../../support/http-mocks'

const mockUnexpectedError = () =>
  HTTP.mockHttpRequest('GET', /surveys/, {
    statusCode: faker.number.int({ min: 404, max: 600 }),
  })

const mockAccessDeniedError = () => {
  HTTP.mockHttpRequest('GET', /surveys/, {
    statusCode: 403,
  })
}
export const SurveysMocks = { mockUnexpectedError, mockAccessDeniedError }
