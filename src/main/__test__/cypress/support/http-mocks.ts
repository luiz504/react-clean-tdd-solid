import { Method } from 'axios'
import { RouteHandler } from 'cypress/types/net-stubbing'

const mockHttpRequest = (
  method: Method,
  url: string | RegExp,
  response?: RouteHandler,
) => {
  return cy.intercept(method, url, {
    delay: 200,
    ...(response as object),
  })
}

export const HTTP = {
  mockHttpRequest,
}
