import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '~/validation/errors'

import { EmailValidation } from './email-validation'

const makeSut = (fieldName = faker.database.column()): EmailValidation => {
  return new EmailValidation(fieldName)
}

describe('EmailValidation', () => {
  it('should keep the field name when initialized', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    expect(sut.fieldName).toBe(fieldName)
  })
  it('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.word.adverb())
    expect(error).toEqual(new InvalidFieldError())
  })
  it('Should return null if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeNull()
  })
  it('should return null if email is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeNull()
  })
})
