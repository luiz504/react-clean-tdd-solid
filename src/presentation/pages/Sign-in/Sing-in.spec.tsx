import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { ValidationSpy } from '~/presentation/__test__'

import { SignIn } from '.'

const makeSut = () => {
  const validationSpy = new ValidationSpy()
  render(<SignIn validation={validationSpy} />)

  return { validationSpy }
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
    const { validationSpy } = makeSut()

    const emailInput = screen.getByTestId('email-input')

    const emailValue = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: emailValue } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(emailValue)
  })

  it('should call validation with correct password value', () => {
    const { validationSpy } = makeSut()

    const passwordInput = screen.getByTestId('pw-input')

    const passwordValue = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: passwordValue } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(passwordValue)
  })

  it('should show email error if validation fails', async () => {
    const { validationSpy } = makeSut()
    const errorMsg = faker.string.sample()
    validationSpy.errorMessage = errorMsg
    const emailInput = screen.getByTestId('email-input')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailError = await screen.findByTestId('email-error')

    expect(emailError).toHaveTextContent(errorMsg)
  })
})
