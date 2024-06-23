import { FieldValidation } from '~/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null

  constructor(readonly fieldName: string) {}
  validate(): Error | null {
    // fieldValue: string
    return this.error
  }
}
