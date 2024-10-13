import { Helpers } from '../support/helpers'

describe('Private Routes', () => {
  describe('should logout and redirect if not authenticated', () => {
    it('/ should redirect to /sign-in', () => {
      cy.visit('/')
      Helpers.testUrl('/sign-in')
      Helpers.testLocalStorageIsEmpty('account')
    })
  })
})
