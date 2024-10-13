const baseUrl = Cypress.config().baseUrl

const testHttpCallsCount = (count: number, selector = '@request.all') => {
  cy.get(selector).should('have.length', count)
}

const testLocalStorageItem = (key: string) => {
  cy.window().then((w) => assert.isOk(w.localStorage.getItem(key)))
}

const testLocalStorageIsEmpty = (key: string) => {
  cy.window().then((w) => assert.isNotOk(w.localStorage.getItem(key)))
}

const setLocalStorageItem = (key: string, value?: string | object | null) => {
  if (!value) {
    localStorage.removeItem(key)
  }
  if (typeof value === 'string') {
    localStorage.setItem(key, value)
    return
  }

  localStorage.setItem(key, JSON.stringify(value))
}
const testUrl = (url: string) => {
  cy.url().should('eq', `${baseUrl}${url}`)
}

export const Helpers = {
  testLocalStorageItem,
  testUrl,
  testHttpCallsCount,
  testLocalStorageIsEmpty,
  setLocalStorageItem,
}
