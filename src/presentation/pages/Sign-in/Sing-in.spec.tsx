import { fireEvent, render, screen } from '@testing-library/react'
import { SignIn } from '.'
import { Validation } from '~/presentation/protocols/validation'

class ValidationSpy implements Validation {
  errorMessage?: string = undefined
  fieldName?: string = undefined
  fieldValue?: string = undefined

  validate(fieldName: string, FieldValue: string): string | undefined {
    this.fieldName = fieldName
    this.fieldValue = FieldValue
    return this.errorMessage
  }
}
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

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual('any_email')
  })

  it('should call validation with correct password value', () => {
    const { validationSpy } = makeSut()
    const passwordInput = screen.getByTestId('pw-input')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual('any_password')
  })
})
