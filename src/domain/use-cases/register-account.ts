import { AccountModel } from '../models/account-model'

export type RegisterAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
export interface RegisterAccount {
  register(params: RegisterAccountParams): Promise<AccountModel>
}
