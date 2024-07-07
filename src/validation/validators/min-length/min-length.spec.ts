import { faker } from '@faker-js/faker'

import { InvalidFieldError } from '~/validation/errors'

import { MinLengthValidation } from './min-length'
const makeSut = (fieldName: string, length = 5) =>
  new MinLengthValidation(fieldName, length)

describe('MinLengthValidation', () => {
  it('should keep the field name when initialized', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    expect(sut.fieldName).toBe(fieldName)
  })
  it('Should return error if field is invalid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    const error = sut.validate({
      [fieldName]: faker.string.alphanumeric({ length: { min: 0, max: 4 } }),
    })

    expect(error).toEqual(new InvalidFieldError())
  })
  it('Should return null if field is valid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    const error = sut.validate({
      [fieldName]: faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
    })

    expect(error).toBeNull()
  })
})
