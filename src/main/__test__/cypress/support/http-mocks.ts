import { RouteHandler } from 'cypress/types/net-stubbing'

export const mockSignInApiCall = (response?: RouteHandler) => {
  return cy.intercept('POST', /login/, {
    delay: 200,
    ...(response as object),
  })
}
