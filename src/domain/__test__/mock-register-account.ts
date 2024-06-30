import { faker } from '@faker-js/faker'

import { RegisterAccountParams } from '../use-cases'

export const mockRegisterAccountParams = (): RegisterAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  }
}
