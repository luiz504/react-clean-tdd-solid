import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string | null = null

  validate(): string | null {
    return this.errorMessage
  }
}
