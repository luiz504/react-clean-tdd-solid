export class InvalidFieldError extends Error {
  constructor(message = 'Invalid field') {
    super(message)
    this.name = 'InvalidFieldError'
  }
}
