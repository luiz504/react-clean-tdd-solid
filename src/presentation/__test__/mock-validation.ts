import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string | null = null
  fieldName?: string = undefined
  fieldValue?: string = undefined

  validate(fieldName: string, FieldValue: string): string | null {
    this.fieldName = fieldName
    this.fieldValue = FieldValue
    return this.errorMessage
  }
}
