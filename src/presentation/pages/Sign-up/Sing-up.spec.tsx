import { MemoryRouter } from 'react-router-dom'

import { SignUp } from '.'
import { render, screen } from '@testing-library/react'

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
const makeSut = () => {
  render(
    <MemoryRouter>
      <SignUp />,
    </MemoryRouter>,
  )
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

    const link = screen.getByTestId('sign-up-link')
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/sign-in')

    const formStatus = screen.getByTestId('form-status')
    expect(formStatus).toBeInTheDocument()
    expect(formStatus.childNodes).toHaveLength(0)
  })
})
