import { FC } from 'react'

import { makeSignUpValidation } from './sign-up-validation-factory'
import { SignUp } from '~/presentation/pages/Sign-up'
import { makeRemoteRegisterAccount } from '../../use-cases/register-account/remote-register-account-factory'

export const MakeSignUp: FC = () => {
  return (
    <SignUp
      registerAccount={makeRemoteRegisterAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
