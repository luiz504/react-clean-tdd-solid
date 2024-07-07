import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '~/validation/errors'
const makeSut = (fieldName: string, fieldToCompare: string) =>
  new CompareFieldsValidation(fieldName, fieldToCompare)

describe('CompareFieldsValidation', () => {
  it('should keep the field name when initialized', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName, faker.lorem.word())
    expect(sut.fieldName).toBe(fieldName)
  })
  it('Should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()

    const sut = makeSut(fieldName, faker.lorem.word())

    const error = sut.validate({
      [fieldName]: faker.lorem.word(),
      [fieldToCompare]: faker.lorem.sentence(),
    })

    expect(error).toEqual(new InvalidFieldError())
  })
  it('should return null if compare is valid', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()

    const value = faker.lorem.word()
    const sut = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({ [fieldName]: value, [fieldToCompare]: value })

    expect(error).toBeNull()
  })
})
