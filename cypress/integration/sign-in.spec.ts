const elementId = {
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
  it('should render sign in page correctly with initial states', () => {
    cy.getByTestId(elementId.emailInput)
      .should('have.attr', 'type', 'email')
      .and('be.enabled')
      .and('be.empty')
      .and('have.attr', 'placeholder', 'Email')
    cy.getByTestId(elementId.emailError).should('not.exist')

    cy.getByTestId(elementId.pwInput)
      .should('have.attr', 'type', 'password')
      .and('be.enabled')
      .and('be.empty')
      .and('have.attr', 'placeholder', 'Password')
    cy.getByTestId(elementId.pwError).should('not.exist')

    cy.getByTestId(elementId.submitButton)
      .should('be.enabled')
      .and('have.text', 'Enter')

    cy.getByTestId(elementId.spinner).should('not.exist')
    cy.getByTestId(elementId.formError).should('not.exist')
  })
})
