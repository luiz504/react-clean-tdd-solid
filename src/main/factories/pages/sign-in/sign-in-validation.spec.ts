import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '~/validation/validators'
import { makeSignInValidation } from './sign-in-validation-factory'

describe('SignInValidationFactory', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeSignInValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
      ]),
    )
  })
})
