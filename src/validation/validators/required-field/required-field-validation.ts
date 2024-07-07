import { RequiredFieldError } from '../../errors'
import { FieldValidation } from '../../protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}
  validate(context: { [key: string]: unknown }): Error | null {
    const fieldValue = context[this.fieldName]
    return fieldValue ? null : new RequiredFieldError()
  }
}
