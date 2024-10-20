import { faker } from '@faker-js/faker'
import { AuthenticateMocks } from './mocks'
import { Helpers } from '../../helpers/helpers'
import { SurveysMocks } from '../surveys/mocks'
const elementsId = {
  emailInput: 'email-input',
  emailInputLabel: 'email-input-label',
  emailError: 'email-error',
  pwInput: 'pw-input',
  pwInputLabel: 'pw-input-label',
  pwError: 'pw-error',
  submitButton: 'submit-button',
  form: 'form',
  spinner: 'form-status-spinner',
  formError: 'form-status-error',
} as const

const fillAndSubmitForm = () => {
  cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
  cy.getByTestId(elementsId.pwInput).type(faker.internet.password())
  cy.getByTestId(elementsId.submitButton).click()
}

describe('Page: Sign in', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
  })

  it('should render page correctly with initial states', () => {
    cy.getByTestId(elementsId.emailInput)
      .should('have.attr', 'type', 'email')
      .and('be.enabled')
      .and('be.empty')

    cy.getByTestId(elementsId.emailInputLabel).should('contain.text', 'Email')
    cy.getByTestId(elementsId.emailError).should('not.exist')

    cy.getByTestId(elementsId.pwInput)
      .should('have.attr', 'type', 'password')
      .and('be.enabled')
      .and('be.empty')

    cy.getByTestId(elementsId.pwInputLabel).should('contain.text', 'Password')
    cy.getByTestId(elementsId.pwError).should('not.exist')

    cy.getByTestId(elementsId.submitButton)
      .should('be.enabled')
      .and('have.text', 'Enter')

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
  })

  it('should validate fields before request on submit', () => {
    cy.getByTestId(elementsId.submitButton).click()

    cy.getByTestId(elementsId.emailError).should('exist')
    cy.getByTestId(elementsId.pwError).should('exist')
    cy.getByTestId(elementsId.submitButton).should('be.enabled')
    cy.getByTestId(elementsId.formError).should('not.exist')
  })

  it('should show InvalidCredentialsError on status 401', () => {
    AuthenticateMocks.InvalidCredentialsError()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
    cy.getByTestId(elementsId.submitButton).should('be.disabled')

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Invalid credentials')
    cy.getByTestId(elementsId.submitButton).should('be.enabled')
    Helpers.testUrl('/sign-in')
  })

  it('should show UnexpectedError if any general error occurs', () => {
    AuthenticateMocks.UnexpectedError()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Something went wrong. Please try again.')

    Helpers.testUrl('/sign-in')
  })

  it('should show UnexpectedError if status 200 but unexpected response', () => {
    AuthenticateMocks.SuccessWithInvalidData()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Something went wrong. Please try again.')

    Helpers.testUrl('/sign-in')
  })

  it('should not make multiple requests', () => {
    AuthenticateMocks.InvalidCredentialsError()
    cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
    cy.getByTestId(elementsId.pwInput).type(faker.internet.password())
    cy.getByTestId(elementsId.pwInput).type(`{enter}`)

    cy.getByTestId(elementsId.form).submit()

    Helpers.testHttpCallsCount(1)
  })

  it('should save account and redirect on success', () => {
    AuthenticateMocks.Success()
    SurveysMocks.Success()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
    cy.getByTestId(elementsId.submitButton).should('be.disabled')

    Helpers.testUrl('/')
    Helpers.testLocalStorageItem('account')
  })

  it('should not call Authenticate if form is invalid', () => {
    AuthenticateMocks.Success()

    cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
    cy.getByTestId(elementsId.pwInput).type(
      faker.lorem.word({ length: { min: 0, max: 4 } }),
    )
    cy.getByTestId(elementsId.submitButton).click()

    Helpers.testHttpCallsCount(0)
  })
})
