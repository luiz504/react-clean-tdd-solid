import { faker } from '@faker-js/faker'

const elementsId = {
  emailInput: 'email-input',
  emailError: 'email-error',
  pwInput: 'pw-input',
  pwError: 'pw-error',
  submitButton: 'submit-button',
  form: 'form',
  spinner: 'form-status-spinner',
  formError: 'form-status-error',
} as const

const baseUrl = Cypress.config().baseUrl

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

  it('should validate fields before request on submit', () => {
    cy.getByTestId(elementsId.submitButton).click()

    cy.getByTestId(elementsId.emailError).should('exist')
    cy.getByTestId(elementsId.pwError).should('exist')
    cy.getByTestId(elementsId.submitButton).should('be.enabled')
    cy.getByTestId(elementsId.formError).should('not.exist')
  })

  it('should show InvalidCredentialsError on status 401', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 401,
        delay: 200,
      },
    )
    cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
    cy.getByTestId(elementsId.pwInput).type(
      faker.lorem.word({ length: { min: 5, max: 30 } }),
    )
    cy.getByTestId(elementsId.submitButton).click()

    cy.getByTestId(elementsId.spinner).should('exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
    cy.getByTestId(elementsId.submitButton).should('be.disabled')

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError).should('exist')
    cy.getByTestId(elementsId.formError).should(
      'have.text',
      'Invalid credentials',
    )
    cy.getByTestId(elementsId.submitButton).should('be.enabled')

    cy.url().should('eq', `${baseUrl}/sign-in`)
  })
})
