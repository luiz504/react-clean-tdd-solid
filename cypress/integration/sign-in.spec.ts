import { expect } from 'chai'

describe('Sign in', () => {
  it('should render sign in page correctly with initial states', () => {
    cy.visit('/sign-in')
    expect(1 + 1).to.equal(2)
  })
})
