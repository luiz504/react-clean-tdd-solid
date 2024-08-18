import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { MemoryRouter } from 'react-router-dom'

import {
  AuthenticationSpy,
  ValidationStub,
  UpdateCurrentAccountMock,
  populateInputField,
} from '~/presentation/__test__'
import { InvalidCredentialsError } from '~/domain/errors'

import { SignIn } from '.'

const FIELDS_TEST_ID = {
  email: {
    input: 'email-input',
    error: 'email-error',
  },
  password: {
    input: 'pw-input',
    error: 'pw-error',
  },

  'submit-button': 'submit-button',
  'form-status-error': 'form-status-error',
  'form-status-spinner': 'form-status-spinner',
} as const

const mockedNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom')
  return {
    ...mod,
    useNavigate: () => mockedNavigate,
  }
})
type SutParams = {
  validationError?: string
}

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  validationStub.errorMessage = params?.validationError || null
  render(
    <MemoryRouter>
      <SignIn
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
      ,
    </MemoryRouter>,
  )

  return { authenticationSpy, updateCurrentAccountMock }
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password(),
) => {
  populateInputField(FIELDS_TEST_ID.email.input, email)
  populateInputField(FIELDS_TEST_ID.password.input, password)

  const submitButton = screen.getByTestId(FIELDS_TEST_ID['submit-button'])

  fireEvent.click(submitButton)

  return { submitButton }
}

describe('Page: Sing-in', () => {
  it('should render correctly with initial state', () => {
    makeSut()

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

    const btnSubmit = screen.getByTestId(FIELDS_TEST_ID['submit-button'])
    expect(btnSubmit).toBeEnabled()
    expect(btnSubmit).toHaveTextContent('Enter')

    const link = screen.getByTestId('sign-up-link')
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/sign-up')

    const formStatus = screen.getByTestId('form-status')
    expect(formStatus).toBeInTheDocument()
    expect(formStatus.childNodes).toHaveLength(0)
  })

  it('should show email error if validation fails', async () => {
    const errorMsg = faker.string.sample()
    makeSut({ validationError: errorMsg })

    populateInputField(FIELDS_TEST_ID.email.input, faker.internet.email())

    const emailError = await screen.findByTestId(FIELDS_TEST_ID.email.error)

    expect(emailError).toHaveTextContent(errorMsg)
  })

  it('should show password error if validation fails', async () => {
    const errorMsg = faker.string.sample()
    makeSut({ validationError: errorMsg })

    populateInputField(FIELDS_TEST_ID.password.input, faker.internet.password())

    const passwordError = await screen.findByTestId(
      FIELDS_TEST_ID.password.error,
    )

    expect(passwordError).toHaveTextContent(errorMsg)
  })

  it('should show spinner on submit and submit button must be disabled', async () => {
    makeSut()
    simulateValidSubmit()

    const spinner = await screen.findByTestId(
      FIELDS_TEST_ID['form-status-spinner'],
    )
    expect(spinner).toBeInTheDocument()

    const btnSubmit = screen.getByTestId(FIELDS_TEST_ID['submit-button'])
    expect(btnSubmit).toBeDisabled()
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
    populateInputField(FIELDS_TEST_ID.email.input, faker.internet.email())

    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should display an error feedback if authentication fails', async () => {
    const error = new InvalidCredentialsError()
    vi.spyOn(AuthenticationSpy.prototype, 'auth').mockRejectedValueOnce(error)
    makeSut()
    simulateValidSubmit()

    const formStatusError = await screen.findByTestId(
      FIELDS_TEST_ID['form-status-error'],
    )

    expect(formStatusError).toBeInTheDocument()
    expect(formStatusError).toHaveTextContent(error.message)
  })

  it('should display an error feedback if any other non-expected error occurs', async () => {
    const error = new Error(faker.lorem.sentence())
    vi.spyOn(AuthenticationSpy.prototype, 'auth').mockRejectedValueOnce(error)
    makeSut()
    simulateValidSubmit()

    const formStatusError = await screen.findByTestId(
      FIELDS_TEST_ID['form-status-error'],
    )

    expect(formStatusError).toBeInTheDocument()
    expect(formStatusError).toHaveTextContent(
      'Something went wrong. Please try again.',
    )
  })

  it('should clear error on next submit', async () => {
    const error = new InvalidCredentialsError()
    vi.spyOn(AuthenticationSpy.prototype, 'auth').mockRejectedValueOnce(error)
    makeSut()
    simulateValidSubmit()

    const formStatusError = await screen.findByTestId(
      FIELDS_TEST_ID['form-status-error'],
    )

    expect(formStatusError).toBeInTheDocument()
    expect(formStatusError).toHaveTextContent(error.message)
    simulateValidSubmit()

    expect(formStatusError).not.toBeInTheDocument()
  })

  it('should call UpdateCurrentAccount on Authentication success', async () => {
    const { authenticationSpy, updateCurrentAccountMock } = makeSut()
    simulateValidSubmit()

    await waitFor(() => {
      expect(updateCurrentAccountMock.account).toEqual(
        authenticationSpy.account,
      )
    })
  })

  it('should display error if UpdateCurrentAccount fails', async () => {
    const { updateCurrentAccountMock } = makeSut()

    vi.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(
      new Error(),
    )

    simulateValidSubmit()
    const formStatusError = await screen.findByTestId(
      FIELDS_TEST_ID['form-status-error'],
    )
    expect(formStatusError).toBeInTheDocument()
    expect(formStatusError).toHaveTextContent(
      'Something went wrong. Please try again.',
    )
  })
  it('should navigate to home page on Authentication success', async () => {
    makeSut()
    simulateValidSubmit()

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/', { replace: true })
    })
  })
})
