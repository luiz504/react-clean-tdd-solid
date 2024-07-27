// import { faker } from '@faker-js/faker'
// import { AuthenticateMocks } from './mocks'
// import { FormHelper } from '../../support/form-helper'
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

// const fillAndSubmitForm = () => {
//   cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
//   cy.getByTestId(elementsId.pwInput).type(faker.internet.password())
//   cy.getByTestId(elementsId.submitButton).click()
// }

describe('Page: Sign Up', () => {
  beforeEach(() => {
    cy.visit('/sign-up')
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
})
