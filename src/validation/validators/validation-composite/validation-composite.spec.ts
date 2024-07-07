import { FieldValidationSpy } from '~/validation/__test__'
import { ValidationComposite } from './validation-composite'

import { faker } from '@faker-js/faker'

const makeSut = (fieldName: string) => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ]
  const sut = ValidationComposite.build(fieldValidationSpies)

  return { sut, fieldValidationSpies }
}
describe('ValidationComposite', () => {
  it('should return the first error if any validator fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(fieldName)
    const error1 = faker.lorem.word()
    fieldValidationSpies[0].error = new Error(error1)
    fieldValidationSpies[1].error = new Error(faker.lorem.word())

    const error = sut.validate(fieldName, {
      [fieldName]: faker.database.column(),
    })
    expect(error).toBe(error1)
  })

  it('should return null if no validator fails', () => {
    const fieldName = faker.database.column()

    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, {
      [fieldName]: faker.database.column(),
    })
    expect(error).toBeNull()
  })
})
