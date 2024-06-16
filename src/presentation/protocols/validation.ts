export interface Validation {
  validate(fieldName: string, FieldValue: string): string | null
}
