import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '~/validation/validators'
import { ValidationBuilder } from './validation-builder'
import { faker } from '@faker-js/faker'

describe('ValidationBuilder', () => {
  it('should return RequiredFiledValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })
  it('should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })
  it('should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const fieldLength = faker.number.int()
    const validations = ValidationBuilder.field(fieldName)
      .min(fieldLength)
      .build()
    expect(validations).toEqual([
      new MinLengthValidation(fieldName, fieldLength),
    ])
  })
  it('should return a sequence of validations', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName)
      .email()
      .min(5)
      .required()
      .build()
    expect(validations).toEqual([
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, 5),
      new RequiredFieldValidation(fieldName),
    ])
  })
})
