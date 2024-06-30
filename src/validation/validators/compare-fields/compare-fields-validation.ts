import { InvalidFieldError } from '~/validation/errors'
import { FieldValidation } from '../../protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly fieldToCompare: string,
  ) {}

  validate() // fieldValue: string
  : Error | null {
    return new InvalidFieldError()
  }
}
