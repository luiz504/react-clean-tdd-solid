import { faker } from '@faker-js/faker'
import { AccountModel } from '../../../../../domain/models/account-model'
import { Helpers } from '../../support/helpers'
import { SurveysMocks } from './mocks'

describe('Page: Surveys', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('account', {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    } satisfies AccountModel)
  })
  it('should present error on UnexpectedError', () => {
    cy.visit('/')
    SurveysMocks.mockUnexpectedError()
    cy.getByTestId('survey-load-error').should(
      'contain.text',
      'Falha ao carregar surveys',
    )
  })
  it('should logout on AccessDeniedError', () => {
    cy.visit('/')
    SurveysMocks.mockAccessDeniedError()
    Helpers.testUrl('/sign-in')
    Helpers.testLocalStorageIsEmpty('account')
  })
})
