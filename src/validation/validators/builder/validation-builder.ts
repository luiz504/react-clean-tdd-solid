import { FieldValidation } from '~/validation/protocols/field-validation'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '..'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs(field: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(this.fieldName, field))
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}
