import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '~/validation/errors'

import { EmailValidation } from './email-validation'

const makeSut = (fieldName: string): EmailValidation => {
  return new EmailValidation(fieldName)
}

describe('EmailValidation', () => {
  it('should keep the field name when initialized', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    expect(sut.fieldName).toBe(fieldName)
  })
  it('Should return error if email is invalid', () => {
    const fieldName = faker.database.column()

    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.word.adverb() })
    expect(error).toEqual(new InvalidFieldError())
  })
  it('Should return null if email is valid', () => {
    const fieldName = faker.database.column()

    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.internet.email() })
    expect(error).toBeNull()
  })
  it('should return null if email is empty', () => {
    const fieldName = faker.database.column()

    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: '' })
    expect(error).toBeNull()
  })
})
