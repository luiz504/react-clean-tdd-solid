import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '~/presentation/utils/cn'
import { Header, Input, Footer, FormStatus } from '~/presentation/components'

import { InvalidCredentialsError } from '~/domain/errors'
import { Validation } from '~/presentation/protocols/validation'

type Field = {
  value: string
  error?: string
}
type FormType = {
  name: Field
  email: Field
  password: Field
  confirmPassword: Field
  submitError?: string
  isSubmitting: boolean
}
type Props = {
  validation: Validation
}
export const SignUp: FC<Props> = ({ validation }) => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const pwInputRef = useRef<HTMLInputElement>(null)
  const pwConfirmationInputRef = useRef<HTMLInputElement>(null)
  const [formValue, setFormValue] = useState<FormType>({
    isSubmitting: false,
    submitError: undefined,
    name: {
      value: '',
      error: undefined,
    },
    email: {
      value: '',
      error: undefined,
    },
    password: {
      value: '',
      error: undefined,
    },
    confirmPassword: {
      value: '',
      error: undefined,
    },
  })
  const { submitError, isSubmitting, name, email, password, confirmPassword } =
    formValue

  const handleChange = (
    fieldName: 'name' | 'email' | 'password' | 'passwordConfirmation',
    value: string,
  ) => {
    const error = validation.validate(fieldName, value)

    setFormValue((old) => ({
      ...old,
      [fieldName]: {
        value,
        error,
      },
    }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting || email.error || password.error) return

    try {
      setFormValue((old) => ({
        ...old,
        isSubmitting: true,
        submitError: undefined,
      }))

      // const { accessToken } = await authentication.auth({
      //   email: email.value,
      //   password: password.value,
      // })

      // await saveAccessToken.save(accessToken)

      // navigate('/', { replace: true })
    } catch (err) {
      let msg = 'Something went wrong. Please try again.'

      if (err instanceof InvalidCredentialsError) {
        msg = err.message
      }

      setFormValue((old) => ({
        ...old,
        isSubmitting: false,
        submitError: msg,
      }))
    }
  }

  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col items-center px-4">
        <form
          data-testid="form"
          className={cn(
            'flex w-full max-w-[400px] flex-col',
            'mt-[10%] p-10',
            'rounded-lg bg-white shadow-md',
          )}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-xl font-bold uppercase text-primary-dark">
            Sign Up
          </h2>

          <Input>
            <Input.InputField
              data-testid="name-input"
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="Name"
              onChange={({ target }) => handleChange('name', target.value)}
            />
            <Input.Error data-testid="name-error" error={name.error} />
          </Input>
          <Input>
            <Input.InputField
              data-testid="email-input"
              ref={emailInputRef}
              type="email"
              name="email"
              placeholder="Email"
              onChange={({ target }) => handleChange('email', target.value)}
            />
            <Input.Error data-testid="email-error" error={email.error} />
          </Input>

          <Input>
            <Input.InputField
              data-testid="pw-input"
              ref={pwInputRef}
              type="password"
              name="password"
              placeholder="Password"
              onChange={({ target }) => handleChange('password', target.value)}
            />
            <Input.Error data-testid="pw-error" error={password.error} />
          </Input>
          <Input>
            <Input.InputField
              data-testid="pw-confirmation-input"
              ref={pwConfirmationInputRef}
              type="password"
              name="password-confirmation"
              autoComplete="new-password"
              placeholder="Confirm Password"
              onChange={({ target }) =>
                handleChange('passwordConfirmation', target.value)
              }
            />
            <Input.Error
              data-testid="pw-confirmation-error"
              error={confirmPassword.error}
            />
          </Input>

          <button
            data-testid="submit-button"
            type="submit"
            disabled={isSubmitting}
            className={cn([
              'mt-8 w-full',
              'rounded bg-primary leading-10 text-white transition-opacity',
              'hover:transition-opacity hover:enabled:opacity-90',
              'focus-within:outline-primary-light',
              'disabled:bg-disabled-bg disabled:text-disabled-color',
            ])}
          >
            Register
          </button>

          <Link
            data-testid="sign-in-link"
            to="/sign-in"
            className="mt-4 text-center lowercase text-primary hover:underline"
          >
            Sign In
          </Link>

          <FormStatus error={submitError} isLoading={isSubmitting} />
        </form>
      </main>

      <Footer />
    </>
  )
}
