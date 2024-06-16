import { Validation } from '~/presentation/protocols/validation'
import { FieldValidation } from '~/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, FieldValue: string): string | null {
    const validators = this.validators.filter((v) => v.fieldName === fieldName)
    for (const validator of validators) {
      const error = validator.validate(FieldValue)
      if (error) {
        return error.message
      }
    }
    return null
  }
}
