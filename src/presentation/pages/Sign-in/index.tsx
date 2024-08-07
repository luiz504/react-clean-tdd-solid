import { FC, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { cn } from '~/presentation/utils/cn'
import { Header, Input, Footer, FormStatus } from '~/presentation/components'

import { Validation } from '~/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '~/domain/use-cases'
import { InvalidCredentialsError } from '~/domain/errors'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}
type FieldName = 'email' | 'password'
type Field = {
  value: string
  error?: string
}
type FormType = {
  email: Field
  password: Field
  submitError?: string
  isSubmitting: boolean
}
export const SignIn: FC<Props> = ({
  validation,
  authentication,
  saveAccessToken,
}) => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const pwInputRef = useRef<HTMLInputElement>(null)
  const [formValue, setFormValue] = useState<FormType>({
    isSubmitting: false,
    submitError: undefined,
    email: {
      value: '',
      error: undefined,
    },
    password: {
      value: '',
      error: undefined,
    },
  })
  const { submitError, isSubmitting, email, password } = formValue
  const formData = { email: email.value, password: password.value }

  const navigate = useNavigate()

  const handleChange = (fieldName: FieldName, value: string) => {
    const error = validation.validate(fieldName, {
      ...formData,
      [fieldName]: value,
    })

    setFormValue((old) => ({
      ...old,
      [fieldName]: {
        value,
        error,
      },
    }))
  }
  const validateFormFields = () => {
    const email = validation.validate('email', formData)
    const password = validation.validate('password', formData)

    if (email || password) {
      setFormValue((old) => ({
        ...old,
        email: {
          ...old.email,
          error: email || undefined,
        },
        password: {
          ...old.password,
          error: password || undefined,
        },
      }))
    }
    return { hasError: email || password }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { hasError } = validateFormFields()

    if (isSubmitting || hasError) return

    try {
      setFormValue((old) => ({
        ...old,
        isSubmitting: true,
        submitError: undefined,
      }))

      const { accessToken } = await authentication.auth({
        email: email.value,
        password: password.value,
      })

      await saveAccessToken.save(accessToken)

      navigate('/', { replace: true })
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
            Sign In
          </h2>
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
            Enter
          </button>

          <Link
            data-testid="sign-up-link"
            to="/sign-up"
            className="mt-4 text-center lowercase text-primary hover:underline"
          >
            Sign Up
          </Link>

          <FormStatus error={submitError} isLoading={isSubmitting} />
        </form>
      </main>

      <Footer />
    </>
  )
}
