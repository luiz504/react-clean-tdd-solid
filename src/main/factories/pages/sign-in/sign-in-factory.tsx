import { FC } from 'react'
import { RemoteAuthentication } from '~/data/use-cases/authentication/remote-authentication'
import { AccountModel } from '~/domain/models'
import { AuthenticationParams } from '~/domain/use-cases'
import { AxiosHttpAdapter } from '~/infra/http/axios-http-adapter/axios-adapter'
import { SignIn } from '~/presentation/pages/Sign-in'
import { ValidationBuilder, ValidationComposite } from '~/validation/validators'

export const MakeSignIn: FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'

  const axiosHttpClient = new AxiosHttpAdapter<
    AuthenticationParams,
    AccountModel
  >()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ])

  return (
    <SignIn
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
