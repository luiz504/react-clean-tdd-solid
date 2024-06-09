import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { ValidationStub } from '~/presentation/__test__'

import { SignIn } from '.'

type SutParams = {
  validationError?: string
}
const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(<SignIn validation={validationStub} />)

  return { validationStub }
}

describe('Page: Sing-in', () => {
  it('should render correctly with initial state', () => {
    makeSut()

    const formStatus = screen.getByTestId('form-status')

    expect(formStatus).toBeInTheDocument()
    expect(formStatus.childNodes).toHaveLength(0)

    expect(screen.getByTestId('email-input')).toBeEnabled()
    expect(screen.getByTestId('email-input')).toHaveValue('')
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()

    expect(screen.getByTestId('pw-input')).toBeEnabled()
    expect(screen.getByTestId('pw-input')).toBeEnabled()
    expect(screen.getByTestId('pw-input')).toHaveValue('')

    expect(screen.queryByTestId('pw-error')).not.toBeInTheDocument()

    const link = screen.getByTestId('sign-up-link')
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/sign-up')
  })

  it('should call validation with correct email value', () => {
    const { validationStub } = makeSut()

    const emailInput = screen.getByTestId('email-input')

    const emailValue = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: emailValue } })
    expect(validationStub.fieldName).toEqual('email')
    expect(validationStub.fieldValue).toEqual(emailValue)
  })

  it('should call validation with correct password value', () => {
    const { validationStub } = makeSut()

    const passwordInput = screen.getByTestId('pw-input')

    const passwordValue = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: passwordValue } })
    expect(validationStub.fieldName).toEqual('password')
    expect(validationStub.fieldValue).toEqual(passwordValue)
  })

  it('should show email error if validation fails', async () => {
    const errorMsg = faker.string.sample()
    makeSut({ validationError: errorMsg })

    const emailInput = screen.getByTestId('email-input')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailError = await screen.findByTestId('email-error')

    expect(emailError).toHaveTextContent(errorMsg)
  })

  it('should show password error if validation fails', async () => {
    const errorMsg = faker.string.sample()
    makeSut({ validationError: errorMsg })

    const passwordInput = screen.getByTestId('pw-input')

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    })

    const passwordError = await screen.findByTestId('pw-error')

    expect(passwordError).toHaveTextContent(errorMsg)
  })
})
