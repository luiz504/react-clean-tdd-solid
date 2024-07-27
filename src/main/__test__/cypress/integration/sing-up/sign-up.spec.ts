import { faker } from '@faker-js/faker'
import { AuthenticateMocks } from './mocks'
import { FormHelper } from '../../support/form-helper'
const elementsId = {
  nameInput: 'name-input',
  nameError: 'name-error',
  emailInput: 'email-input',
  emailError: 'email-error',
  pwInput: 'pw-input',
  pwError: 'pw-error',
  pwConfirmationInput: 'pw-confirmation-input',
  pwConfirmationError: 'pw-confirmation-error',
  submitButton: 'submit-button',
  form: 'form',
  spinner: 'form-status-spinner',
  formError: 'form-status-error',
} as const

const PAGE_URL = '/sign-up' as const
const fillAndSubmitForm = () => {
  cy.getByTestId(elementsId.nameInput).type(faker.internet.userName())
  cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
  const pw = faker.internet.password()
  cy.getByTestId(elementsId.pwInput).type(pw)
  cy.getByTestId(elementsId.pwConfirmationInput).type(pw)

  cy.getByTestId(elementsId.submitButton).click()
}

describe('Page: Sign Up', () => {
  beforeEach(() => {
    cy.visit(PAGE_URL)
  })

  it('should render page correctly with initial states', () => {
    cy.getByTestId(elementsId.nameInput)
      .should('have.attr', 'type', 'text')
      .and('be.enabled')
      .and('be.empty')
      .and('have.attr', 'placeholder', 'Name')
    cy.getByTestId(elementsId.nameError).should('not.exist')

    cy.getByTestId(elementsId.emailInput)
      .should('have.attr', 'type', 'email')
      .and('be.enabled')
      .and('be.empty')
      .and('have.attr', 'placeholder', 'Email')
    cy.getByTestId(elementsId.emailError).should('not.exist')

    cy.getByTestId(elementsId.pwInput)
      .should('have.attr', 'type', 'password')
      .and('be.enabled')
      .and('be.empty')
      .and('have.attr', 'placeholder', 'Password')
    cy.getByTestId(elementsId.pwError).should('not.exist')

    cy.getByTestId(elementsId.pwConfirmationInput)
      .should('have.attr', 'type', 'password')
      .and('be.enabled')
      .and('be.empty')
      .and('have.attr', 'placeholder', 'Confirm Password')
    cy.getByTestId(elementsId.pwConfirmationError).should('not.exist')

    cy.getByTestId(elementsId.submitButton)
      .should('be.enabled')
      .and('have.text', 'Register')

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
  })

  it('should validate fields before request on submit', () => {
    cy.getByTestId(elementsId.submitButton).click()

    cy.getByTestId(elementsId.nameError).should('exist')
    cy.getByTestId(elementsId.emailError).should('exist')
    cy.getByTestId(elementsId.pwError).should('exist')
    cy.getByTestId(elementsId.pwConfirmationError).should('exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
    cy.getByTestId(elementsId.submitButton).should('be.enabled')
  })

  it('should show InvalidCredentialsError on status 403', () => {
    AuthenticateMocks.EmailInUseError()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
    cy.getByTestId(elementsId.submitButton).should('be.disabled')

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Email already in use')
    cy.getByTestId(elementsId.submitButton).should('be.enabled')
    FormHelper.testUrl(PAGE_URL)
  })

  it('should show UnexpectedError if any general error occurs', () => {
    AuthenticateMocks.UnexpectedError()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Something went wrong. Please try again.')

    FormHelper.testUrl(PAGE_URL)
  })

  it('should show UnexpectedError if status 200 but unexpected response', () => {
    AuthenticateMocks.SuccessWithInvalidData()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Something went wrong. Please try again.')

    FormHelper.testUrl(PAGE_URL)
  })

  it('should not make multiple requests', () => {
    AuthenticateMocks.EmailInUseError()
    cy.getByTestId(elementsId.nameInput).type(faker.internet.userName())
    cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
    const pw = faker.internet.password()
    cy.getByTestId(elementsId.pwInput).type(pw)
    cy.getByTestId(elementsId.pwConfirmationInput).type(pw)
    cy.getByTestId(elementsId.pwConfirmationInput).type(`{enter}`)

    cy.getByTestId(elementsId.form).submit()

    FormHelper.testHttpCallsCount(1)
  })

  it('should save access token and redirect on success', () => {
    AuthenticateMocks.Success()
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
    cy.getByTestId(elementsId.submitButton).should('be.disabled')

    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('should not call Authenticate if form is invalid', () => {
    AuthenticateMocks.Success()
    cy.getByTestId(elementsId.nameInput).type(faker.internet.userName())
    cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
    cy.getByTestId(elementsId.pwInput).type(
      faker.internet.password({ length: 8 }),
    )
    cy.getByTestId(elementsId.pwConfirmationInput).type(
      faker.internet.password({ length: 10 }),
    )
    cy.getByTestId(elementsId.submitButton).click()

    FormHelper.testHttpCallsCount(0)
  })
})
