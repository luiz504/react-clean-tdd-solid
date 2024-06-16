import { RequiredFieldError } from '../../errors'
import { FieldValidation } from '../../protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}
  validate(FieldValue: string): Error | null {
    return FieldValue ? null : new RequiredFieldError()
  }
}
