export class InvalidResourceFormatError extends Error {
  constructor() {
    super('Invalid resource format')
    this.name = 'InvalidResourceFormatError'
  }
}
