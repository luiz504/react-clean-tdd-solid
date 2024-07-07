import { InvalidFieldError } from '~/validation/errors'
import { FieldValidation } from '~/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly minLength: number,
  ) {}

  validate(context: { [key: string]: unknown }): Error | null {
    const fieldValue = context[this.fieldName]

    if (typeof fieldValue !== 'string') return new InvalidFieldError()
    return fieldValue.length >= this.minLength ? null : new InvalidFieldError()
  }
}
