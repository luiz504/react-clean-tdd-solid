import { InvalidFieldError } from '~/validation/errors'

import { MinLengthValidation } from './min-length'

describe('MinLengthValidation', () => {
  it('Should return error if field is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError())
  })
  it('Should return null if field is valid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('12345')

    expect(error).toBeNull()
  })
})
