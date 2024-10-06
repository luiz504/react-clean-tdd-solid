import { AccountModel, accountModelSchema } from '../models/account-model'

export const authenticationParamsSchema = accountModelSchema
export type AuthenticationParams = {
  email: string
  password: string
}

export type AuthenticationModel = AccountModel
export interface Authentication {
  auth(params: AuthenticationParams): Promise<AuthenticationModel>
}
