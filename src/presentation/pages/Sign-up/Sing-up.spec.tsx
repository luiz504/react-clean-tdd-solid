import { MemoryRouter } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen } from '@testing-library/react'

import {
  RegisterAccountSpy,
  ValidationStub,
  populateInputField,
} from '~/presentation/__test__'

import { SignUp } from '.'

const FIELDS_TEST_ID = {
  name: {
    input: 'name-input',
    error: 'name-error',
  },
  email: {
    input: 'email-input',
    error: 'email-error',
  },
  password: {
    input: 'pw-input',
    error: 'pw-error',
  },
  'password-confirmation': {
    input: 'pw-confirmation-input',
    error: 'pw-confirmation-error',
  },
  'submit-button': 'submit-button',
} as const

type SutParams = {
  validationError: string
}
const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError || null

  const registerAccountSpy = new RegisterAccountSpy()

  render(
    <MemoryRouter>
      <SignUp
        validation={validationStub}
        registerAccount={registerAccountSpy}
      />
      ,
    </MemoryRouter>,
  )
  return { validationStub, registerAccountSpy }
}

const simulateValidSubmit = (
  name = faker.person.fullName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
) => {
  populateInputField(FIELDS_TEST_ID.name.input, name)
  populateInputField(FIELDS_TEST_ID.email.input, email)
  populateInputField(FIELDS_TEST_ID.password.input, password)
  populateInputField(FIELDS_TEST_ID['password-confirmation'].input, password)

  const submitButton = screen.getByTestId(FIELDS_TEST_ID['submit-button'])

  fireEvent.click(submitButton)

  return { submitButton }
}

describe('Page: Sign-up', () => {
  it('should render correctly with initial state', () => {
    makeSut()

    expect(screen.getByTestId(FIELDS_TEST_ID.name.input)).toBeEnabled()
    expect(screen.getByTestId(FIELDS_TEST_ID.name.input)).toHaveValue('')
    expect(
      screen.queryByTestId(FIELDS_TEST_ID.name.error),
    ).not.toBeInTheDocument()

    expect(screen.getByTestId(FIELDS_TEST_ID.email.input)).toBeEnabled()
    expect(screen.getByTestId(FIELDS_TEST_ID.email.input)).toHaveValue('')
    expect(
      screen.queryByTestId(FIELDS_TEST_ID.email.error),
    ).not.toBeInTheDocument()

    expect(screen.getByTestId(FIELDS_TEST_ID.password.input)).toBeEnabled()
    expect(screen.getByTestId(FIELDS_TEST_ID.password.input)).toHaveValue('')
    expect(
      screen.queryByTestId(FIELDS_TEST_ID.password.error),
    ).not.toBeInTheDocument()

    expect(
      screen.getByTestId(FIELDS_TEST_ID['password-confirmation'].input),
    ).toBeEnabled()
    expect(
      screen.getByTestId(FIELDS_TEST_ID['password-confirmation'].input),
    ).toHaveValue('')
    expect(
      screen.queryByTestId(FIELDS_TEST_ID['password-confirmation'].error),
    ).not.toBeInTheDocument()

    const btnSubmit = screen.getByTestId(FIELDS_TEST_ID['submit-button'])
    expect(btnSubmit).toBeEnabled()
    expect(btnSubmit).toHaveTextContent('Register')

    const link = screen.getByTestId('sign-in-link')
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/sign-in')

    const formStatus = screen.getByTestId('form-status')
    expect(formStatus).toBeInTheDocument()
    expect(formStatus.childNodes).toHaveLength(0)
  })

  it('should show name error if validation fails', async () => {
    const errorMsg = faker.lorem.sentence()
    makeSut({ validationError: errorMsg })

    populateInputField(FIELDS_TEST_ID.name.input, faker.person.fullName())

    const nameError = await screen.findByTestId(FIELDS_TEST_ID.name.error)
    expect(nameError).toBeInTheDocument()
    expect(nameError).toHaveTextContent(errorMsg)
  })

  it('should show email error if validation fails', async () => {
    const errorMsg = faker.lorem.sentence()
    makeSut({ validationError: errorMsg })

    populateInputField(FIELDS_TEST_ID.email.input, faker.lorem.word())

    const emailError = await screen.findByTestId(FIELDS_TEST_ID.email.error)
    expect(emailError).toBeInTheDocument()
    expect(emailError).toHaveTextContent(errorMsg)
  })

  it('should show password error if validation fails', async () => {
    const errorMsg = faker.lorem.sentence()
    makeSut({ validationError: errorMsg })

    populateInputField(FIELDS_TEST_ID.password.input, faker.lorem.word())

    const passwordError = await screen.findByTestId(
      FIELDS_TEST_ID.password.error,
    )
    expect(passwordError).toBeInTheDocument()
    expect(passwordError).toHaveTextContent(errorMsg)
  })

  it('should show confirm password error if validation fails', async () => {
    const errorMsg = faker.lorem.sentence()
    makeSut({ validationError: errorMsg })

    populateInputField(
      FIELDS_TEST_ID['password-confirmation'].input,
      faker.lorem.word(),
    )

    const passwordError = await screen.findByTestId(
      FIELDS_TEST_ID['password-confirmation'].error,
    )
    expect(passwordError).toBeInTheDocument()
    expect(passwordError).toHaveTextContent(errorMsg)
  })

  it('should show spinner on submit and submit button must be disabled', async () => {
    makeSut()
    simulateValidSubmit()

    const spinner = await screen.findByTestId('form-status-spinner')
    expect(spinner).toBeInTheDocument()

    const btnSubmit = screen.getByTestId(FIELDS_TEST_ID['submit-button'])
    expect(btnSubmit).toBeDisabled()
  })

  it('should call registerAccount with correct values', async () => {
    const { registerAccountSpy } = makeSut()
    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(name, email, password)

    expect(registerAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    })
  })

  it('should call authentication only once', async () => {
    const { registerAccountSpy } = makeSut()
    const { submitButton } = simulateValidSubmit()

    expect(submitButton).toBeDisabled()

    fireEvent.click(submitButton)

    expect(registerAccountSpy.callsCount).toBe(1)
  })
})
