import { AccountModel, accountModelSchema } from '../models/account-model'

export type RegisterAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
export const registerAccountModelSchema = accountModelSchema
export type RegisterAccountModel = AccountModel

export interface RegisterAccount {
  register(params: RegisterAccountParams): Promise<RegisterAccountModel>
}
