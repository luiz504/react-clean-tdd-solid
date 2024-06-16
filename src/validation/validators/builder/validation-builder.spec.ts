import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '~/validation/validators'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  it('should return RequiredFiledValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
  it('should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
  it('should return MinLengthValidation', () => {
    const validations = ValidationBuilder.field('any_field').min(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })
})
