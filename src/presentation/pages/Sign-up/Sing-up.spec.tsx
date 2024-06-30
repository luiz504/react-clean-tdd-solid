import { MemoryRouter } from 'react-router-dom'

import { SignUp } from '.'
import { render, screen } from '@testing-library/react'
import { ValidationStub, populateInputField } from '~/presentation/__test__'
import { faker } from '@faker-js/faker'

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

  render(
    <MemoryRouter>
      <SignUp validation={validationStub} />,
    </MemoryRouter>,
  )
  return { validationStub }
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

  it('should call validation with correct name value', () => {
    const { validationStub } = makeSut()

    const nameValue = faker.person.fullName()
    populateInputField(FIELDS_TEST_ID.name.input, nameValue)

    expect(validationStub.fieldName).toEqual('name')
    expect(validationStub.fieldValue).toEqual(nameValue)
    expect(
      screen.queryByTestId(FIELDS_TEST_ID.name.error),
    ).not.toBeInTheDocument()
  })

  it('should show name error if validation fails', async () => {
    const errorMsg = faker.lorem.sentence()
    makeSut({ validationError: errorMsg })

    populateInputField(FIELDS_TEST_ID.name.input, faker.person.fullName())

    const nameError = await screen.findByTestId(FIELDS_TEST_ID.name.error)
    expect(nameError).toBeInTheDocument()
    expect(nameError).toHaveTextContent(errorMsg)
  })
})
