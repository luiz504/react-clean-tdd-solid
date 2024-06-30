import { AccountModel } from '../models/account-model'

export type RegisterParams = {
  name: string
  email: string
  password: string
}
export interface RegisterAccount {
  register(params: RegisterParams): Promise<AccountModel>
}
