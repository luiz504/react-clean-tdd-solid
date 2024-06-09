import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string | undefined = undefined
  fieldName?: string = undefined
  fieldValue?: string = undefined

  validate(fieldName: string, FieldValue: string): string | undefined {
    this.fieldName = fieldName
    this.fieldValue = FieldValue
    return this.errorMessage
  }
}
