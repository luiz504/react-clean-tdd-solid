export class UnexpectedError extends Error {
  constructor(message = 'Something went wrong. Please try again later.') {
    super(message)
    this.name = 'UnexpectedError'
  }
}
