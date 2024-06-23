import { ValidationBuilder, ValidationComposite } from '~/validation/validators'
import { makeSignInValidation } from './sign-in-validation-factory'

describe('SignInValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeSignInValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ]),
    )
  })
})
