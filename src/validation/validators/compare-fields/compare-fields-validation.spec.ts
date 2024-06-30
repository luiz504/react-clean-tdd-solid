import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '~/validation/errors'
const makeSut = (valueToCompare: string, fieldName = faker.database.column()) =>
  new CompareFieldsValidation(fieldName, valueToCompare)

describe('CompareFieldsValidation', () => {
  it('should keep the field name when initialized', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(faker.lorem.word(), fieldName)
    expect(sut.fieldName).toBe(fieldName)
  })
  it('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.lorem.word())

    const error = sut.validate('any_value')

    expect(error).toEqual(new InvalidFieldError())
  })
  it('should return null if compare is valid', () => {
    const value = faker.lorem.word()
    const sut = makeSut(value)
    const error = sut.validate(value)

    expect(error).toBeNull()
  })
})
