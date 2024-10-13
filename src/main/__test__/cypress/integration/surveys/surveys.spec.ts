import { Helpers } from '../../helpers/helpers'
import { SurveysMocks } from './mocks'

describe('Page: Surveys', () => {
  beforeEach(() => {
    cy.fixture('fx:account').then((account) => {
      Helpers.setLocalStorageItem('account', account)
    })

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
    SurveysMocks.mockUnexpectedError()
    cy.getByTestId('user-name').should('contain.text', 'any_name')
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
