import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../__test__/mock-field-validation'

const makeSut = (fieldName = 'any_field') => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ]
  const sut = new ValidationComposite(fieldValidationSpies)

  return { sut, fieldValidationSpies }
}
describe('ValidationComposite', () => {
  it('should return the first error if any validator fails', () => {
    const { sut, fieldValidationSpies } = makeSut()

    fieldValidationSpies[0].error = new Error('first_error_message')
    fieldValidationSpies[1].error = new Error('second_error_message')

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
