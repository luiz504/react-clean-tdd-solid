import { faker } from '@faker-js/faker'
const elementsId = {
  emailInput: 'email-input',
  emailError: 'email-error',
  pwInput: 'pw-input',
  pwError: 'pw-error',
  submitButton: 'submit-button',
  spinner: 'form-status-spinner',
  formError: 'form-status-error',
} as const

describe('Sign in', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
  })
  it('should render page correctly with initial states', () => {
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

    cy.getByTestId(elementsId.submitButton)
      .should('be.enabled')
      .and('have.text', 'Enter')

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
  })
  it('should show errors if form is invalid', () => {
    cy.getByTestId(elementsId.emailInput).type(faker.lorem.word())
    cy.getByTestId(elementsId.emailError).should('have.text', 'Invalid field')

    cy.getByTestId(elementsId.pwInput).type(
      faker.lorem.word({ length: { min: 0, max: 4 } }),
    )
    cy.getByTestId(elementsId.pwError).should('have.text', 'Invalid field')
    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
  })
})
