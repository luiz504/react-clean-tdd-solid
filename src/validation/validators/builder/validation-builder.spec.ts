import { RequiredFieldValidation } from '~/validation/validators'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  it('should return RequiredFiledValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
