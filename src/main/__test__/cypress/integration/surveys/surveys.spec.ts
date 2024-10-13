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
    cy.visit('/')
  })
  it('should present error on UnexpectedError', () => {
    SurveysMocks.mockUnexpectedError()

    cy.getByTestId('survey-load-error').should(
      'contain.text',
      'Falha ao carregar surveys',
    )
  })
  it('should logout on AccessDeniedError', () => {
    SurveysMocks.mockAccessDeniedError()
    Helpers.testUrl('/sign-in')
    Helpers.testLocalStorageIsEmpty('account')
  })
  it('should present correct username', () => {
    const account = {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    } satisfies AccountModel

    Helpers.setLocalStorageItem('account', account)
    SurveysMocks.mockUnexpectedError()
    cy.getByTestId('user-name').should('contain.text', account.name)
  })
  it('should logout on click logout button', () => {
    SurveysMocks.mockUnexpectedError()
    cy.getByTestId('logout-btn')
      .should('contain.text', 'Logout')
      .should('be.enabled')
      .click()

    Helpers.testUrl('/sign-in')
    Helpers.testLocalStorageIsEmpty('account')
  })
})
