import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { AuthenticationSpy, ValidationStub } from '~/presentation/__test__'

import { SignIn } from '.'

type SutParams = {
  validationError?: string
}
const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <SignIn validation={validationStub} authentication={authenticationSpy} />,
  )

  return { authenticationSpy, validationStub }
}

const populateEmailField = (email = faker.internet.email()) => {
  const emailInput = screen.getByTestId('email-input')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password = faker.internet.password()) => {
  const passwordInput = screen.getByTestId('pw-input')
  fireEvent.input(passwordInput, {
    target: { value: password },
  })
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password(),
) => {
  populateEmailField(email)
  populatePasswordField(password)

  const submitButton = screen.getByTestId('submit-button')

  fireEvent.click(submitButton)

  return { submitButton }
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

    const emailValue = faker.internet.email()
    populateEmailField(emailValue)

    expect(validationStub.fieldName).toEqual('email')
    expect(validationStub.fieldValue).toEqual(emailValue)
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()
  })

  it('should call validation with correct password value', () => {
    const { validationStub } = makeSut()
    const passwordValue = faker.internet.password()

    populatePasswordField(passwordValue)

    expect(validationStub.fieldName).toEqual('password')
    expect(validationStub.fieldValue).toEqual(passwordValue)

    expect(screen.queryByTestId('pw-error')).not.toBeInTheDocument()
  })

  it('should show email error if validation fails', async () => {
    const errorMsg = faker.string.sample()
    makeSut({ validationError: errorMsg })

    populateEmailField()

    const emailError = await screen.findByTestId('email-error')

    expect(emailError).toHaveTextContent(errorMsg)
  })

  it('should show password error if validation fails', async () => {
    const errorMsg = faker.string.sample()
    makeSut({ validationError: errorMsg })

    populatePasswordField()

    const passwordError = await screen.findByTestId('pw-error')

    expect(passwordError).toHaveTextContent(errorMsg)
  })

  it('should show spinner on submit', async () => {
    makeSut()
    simulateValidSubmit()

    const spinner = await screen.findByTestId('form-status-spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('should call authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    })
  })

  it('should call authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    const { submitButton } = simulateValidSubmit()

    expect(submitButton).toBeDisabled()

    fireEvent.click(submitButton)

    expect(authenticationSpy.callsCount).toBe(1)
  })
  it('should not call authentication if form is invalid', async () => {
    const { authenticationSpy } = makeSut({
      validationError: faker.lorem.sentence(),
    })
    populateEmailField()

    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})
