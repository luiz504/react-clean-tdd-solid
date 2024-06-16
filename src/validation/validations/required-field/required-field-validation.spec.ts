import { RequiredFieldError } from '~/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = (fieldName = faker.database.column()) =>
  new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  it('should keep the field name when initialized', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName)
    expect(sut.fieldName).toBe(fieldName)
  })
  it('Should return error if field is empty', () => {
    const sut = makeSut()

    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
  it('should return null if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word())

    expect(error).toBeNull()
  })
})
