import { InvalidFieldError } from '~/validation/errors'
import { FieldValidation } from '~/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly minLength: number,
  ) {}

  validate(fieldValue: string): Error | null {
    return fieldValue.length >= this.minLength ? null : new InvalidFieldError()
  }
}
