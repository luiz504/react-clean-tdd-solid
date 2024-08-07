import { InvalidFieldError } from '~/validation/errors'
import { FieldValidation } from '~/validation/protocols/field-validation'

const complexEmailRegex =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)\])$/

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}
  validate(context: { [key: string]: unknown }): Error | null {
    const fieldValue = context[this.fieldName]

    if (typeof fieldValue !== 'string') return new InvalidFieldError()
    if (!fieldValue) return null

    return complexEmailRegex.test(fieldValue) ? null : new InvalidFieldError()
  }
}
