import { FC } from 'react'

import { SignIn } from '~/presentation/pages/Sign-in'

import { makeRemoteAuthentication } from '../../use-cases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '../../use-cases/save-access-token/local-save-access-token-factory'
import { makeSignInValidation } from './sign-in-validation-factory'

export const MakeSignIn: FC = () => {
  return (
    <SignIn
      authentication={makeRemoteAuthentication()}
      validation={makeSignInValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
