import { RouteHandler } from 'cypress/types/net-stubbing'

export const mockSignInApiCall = (response?: RouteHandler) => {
  return cy.intercept('POST', /login/, {
    delay: 200,
    ...(response as object),
  })
}

export const mockSignUpApiCall = (response?: RouteHandler) => {
  return cy.intercept('POST', /signup/, {
    delay: 200,
    ...(response as object),
  })
}
