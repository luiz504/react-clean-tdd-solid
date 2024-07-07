import { InvalidFieldError } from '~/validation/errors'
import { FieldValidation } from '../../protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly fieldToCompare: string,
  ) {}

  validate(context: { [key: string]: unknown }): Error | null {
    const fieldValue = context[this.fieldName]
    const fieldToCompareValue = context[this.fieldToCompare]
    const isEqual = fieldValue === fieldToCompareValue
    return isEqual ? null : new InvalidFieldError()
  }
}
