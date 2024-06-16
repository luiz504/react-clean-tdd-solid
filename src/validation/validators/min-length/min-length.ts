import { InvalidFieldError } from '~/validation/errors'
import { FieldValidation } from '~/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly minLentgh: number, //eslint-disable-line
  ) {}

  validate(fieldValue: string): Error | null {//eslint-disable-line
    return new InvalidFieldError()
  }
}
