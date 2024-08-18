import { FC, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { cn } from '~/presentation/utils/cn'
import {
  HeaderGuest,
  Input,
  Footer,
  FormStatus,
} from '~/presentation/components'

import { EmailInUserError } from '~/domain/errors'
import { Validation } from '~/presentation/protocols/validation'
import { RegisterAccount, SaveAccessToken } from '~/domain/use-cases'

type Field = {
  value: string
  error?: string
}
type FormType = {
  name: Field
  email: Field
  password: Field
  passwordConfirmation: Field
  submitError?: string
  isSubmitting: boolean
}
type Props = {
  validation: Validation
  registerAccount: RegisterAccount
  saveAccessToken: SaveAccessToken
}
export const SignUp: FC<Props> = ({
  validation,
  registerAccount,
  saveAccessToken,
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const pwInputRef = useRef<HTMLInputElement>(null)
  const pwConfirmationInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

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
    passwordConfirmation: {
      value: '',
      error: undefined,
    },
  })
  const {
    submitError,
    isSubmitting,
    name,
    email,
    password,
    passwordConfirmation,
  } = formValue
  const formData = {
    name: name.value,
    email: email.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
  }
  const handleChange = (
    fieldName: 'name' | 'email' | 'password' | 'passwordConfirmation',
    value: string,
  ) => {
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
    const name = validation.validate('name', formData)
    const email = validation.validate('email', formData)
    const password = validation.validate('password', formData)
    const passwordConfirmation = validation.validate(
      'passwordConfirmation',
      formData,
    )

    if (name || email || password || passwordConfirmation) {
      setFormValue((old) => ({
        ...old,
        name: {
          ...old.name,
          error: name || undefined,
        },
        email: {
          ...old.email,
          error: email || undefined,
        },
        password: {
          ...old.password,
          error: password || undefined,
        },
        passwordConfirmation: {
          ...old.passwordConfirmation,
          error: passwordConfirmation || undefined,
        },
      }))
    }
    return { hasError: name || email || password || passwordConfirmation }
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
      const { accessToken } = await registerAccount.register({
        name: name.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value,
      })

      await saveAccessToken.save(accessToken)

      navigate('/', { replace: true })
    } catch (err) {
      let msg = 'Something went wrong. Please try again.'

      if (err instanceof EmailInUserError) {
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
      <HeaderGuest />

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <form
          data-testid="form"
          className={cn(
            'flex w-full max-w-[400px] flex-col',
            'my-10 px-4 py-10 md:px-10',
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
              label="Name"
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
              label="Email"
              placeholder="john@example.com"
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
              label="Password"
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
              label="Confirm Password"
              onChange={({ target }) =>
                handleChange('passwordConfirmation', target.value)
              }
            />
            <Input.Error
              data-testid="pw-confirmation-error"
              error={passwordConfirmation.error}
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
            replace
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
