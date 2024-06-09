import { Validation } from '../protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage?: string = undefined
  fieldName?: string = undefined
  fieldValue?: string = undefined

  validate(fieldName: string, FieldValue: string): string | undefined {
    this.fieldName = fieldName
    this.fieldValue = FieldValue
    return this.errorMessage
  }
}
