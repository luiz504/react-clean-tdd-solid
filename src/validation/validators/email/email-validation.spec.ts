import { faker } from '@faker-js/faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '~/validation/errors'

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.database.column())
    const error = sut.validate(faker.word.adverb())
    expect(error).toEqual(new InvalidFieldError())
  })
  it('Should return null if email is valid', () => {
    const sut = new EmailValidation(faker.database.column())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeNull()
  })
})
