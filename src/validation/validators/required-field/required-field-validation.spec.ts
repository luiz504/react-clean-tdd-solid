import { faker } from '@faker-js/faker'

import { RequiredFieldError } from '~/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (fieldName: string) => new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  it('should keep the field name when initialized', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    expect(sut.fieldName).toBe(fieldName)
  })
  it('Should return error if field is empty', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)

    const error = sut.validate({ [fieldName]: '' })

    expect(error).toEqual(new RequiredFieldError())
  })
  it('should return null if field is not empty', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.lorem.word() })

    expect(error).toBeNull()
  })
})
