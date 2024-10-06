import { FC } from 'react'

import { SignIn } from '~/presentation/pages/Sign-in'

import { makeRemoteAuthentication } from '../../use-cases'
import { makeSignInValidation } from './sign-in-validation-factory'

export const MakeSignIn: FC = () => {
  return (
    <SignIn
      authentication={makeRemoteAuthentication()}
      validation={makeSignInValidation()}
    />
  )
}
