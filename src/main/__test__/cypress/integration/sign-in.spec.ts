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

const fillAndSubmitForm = () => {
  cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
  cy.getByTestId(elementsId.pwInput).type(faker.internet.password())
  cy.getByTestId(elementsId.submitButton).click()
}

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
    fillAndSubmitForm()

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

  it('should show UnexpectedError if any general error occurs', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: faker.number.int({ min: 402, max: 600 }),
        delay: 200,
      },
    )
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Something went wrong. Please try again.')

    cy.url().should('eq', `${baseUrl}/sign-in`)
  })

  it('should show UnexpectedError if status 200 but unexpected response', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: { invalidProperty: faker.string.uuid() },
        delay: 200,
      },
    )
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('not.exist')
    cy.getByTestId(elementsId.formError)
      .should('exist')
      .should('have.text', 'Something went wrong. Please try again.')

    cy.url().should('eq', `${baseUrl}/sign-in`)
  })

  it('should not make multiple requests', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 400,
        delay: 500,
      },
    ).as('requestAuthenticate')
    cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
    cy.getByTestId(elementsId.pwInput).type(faker.internet.password())
    cy.getByTestId(elementsId.pwInput).type(`{enter}`)

    cy.getByTestId(elementsId.form).submit()

    cy.get('@requestAuthenticate.all').should('have.length', 1)
  })

  it('should save access token and redirect on success', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: { accessToken: faker.string.uuid() },
        delay: 200,
      },
    )
    fillAndSubmitForm()

    cy.getByTestId(elementsId.spinner).should('exist')
    cy.getByTestId(elementsId.formError).should('not.exist')
    cy.getByTestId(elementsId.submitButton).should('be.disabled')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then((w) => assert.isOk(w.localStorage.getItem('accessToken')))
  })

  it('should not call Authenticate if form is invalid', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: { accessToken: faker.string.uuid() },
        delay: 200,
      },
    ).as('requestAuthenticate')

    cy.getByTestId(elementsId.emailInput).type(faker.internet.email())
    cy.getByTestId(elementsId.pwInput).type(
      faker.lorem.word({ length: { min: 0, max: 4 } }),
    )
    cy.getByTestId(elementsId.submitButton).click()

    cy.get('@requestAuthenticate.all').should('have.length', 0)
  })
})
