import { faker } from '@faker-js/faker'
import { Method } from 'axios'
const DELAY = 200
export const mockUnauthorizedError = (
  method: Method,
  url: string | RegExp,
): void => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      delay: DELAY,
      statusCode: 401,
      body: {
        error: faker.lorem.words(),
      },
    },
  ).as('request')
}

const mockForbiddenError = (method: Method, url: string | RegExp) => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      delay: DELAY,
      statusCode: 403,
      body: {
        error: faker.lorem.words(),
      },
    },
  ).as('request')
}

const mockServerError = (
  method: string,
  url: RegExp,
  status?: number,
): void => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      delay: DELAY,
      statusCode: status || 500,
      body: {
        error: faker.lorem.words(),
      },
    },
  ).as('request')
}

const mockOk = (
  method: string,
  url: string | RegExp,
  fixture: string,
  alias: string = 'request',
): void => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      delay: DELAY,
      statusCode: 200,
      fixture,
    },
  ).as(alias)
}

export const HTTP = {
  mockUnauthorizedError,
  mockForbiddenError,
  mockServerError,
  mockOk,
}
