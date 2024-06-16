import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../__test__/mock-field-validation'

describe('ValidationComposite', () => {
  it('should return error if any validator fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('any_error_message')
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })
})
