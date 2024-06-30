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
    const sut = makeSut()

    const error = sut.validate('')

    expect(error).toEqual(new InvalidFieldError())
  })
  it.todo('should return null if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word())

    expect(error).toBeNull()
  })
})
