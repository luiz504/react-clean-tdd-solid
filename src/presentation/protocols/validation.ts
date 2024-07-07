export interface Validation {
  validate(fieldName: string, context: object): string | null
}
