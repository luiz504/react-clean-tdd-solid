export interface FieldValidation {
  fieldName: string
  validate(context: object): Error | null
}
