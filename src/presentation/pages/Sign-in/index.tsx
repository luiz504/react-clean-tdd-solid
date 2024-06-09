import { FC, useRef, useState } from 'react'
import { cn } from '~/presentation/utils/cn'

import { Input } from '~/presentation/components/Input'
import { Footer } from '~/presentation/components/Footer'

import { Header, FormStatus } from './components'
import { Validation } from '~/presentation/protocols/validation'

type Props = {
  validation: Validation
}
type Field = {
  error?: string
}
type FormType = {
  email: Field
  password: Field
  submitError?: string
  isSubmitting: boolean
}
export const SignIn: FC<Props> = ({ validation }) => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const pwInputRef = useRef<HTMLInputElement>(null)
  const [formValue, setFormValue] = useState<FormType>({
    isSubmitting: false,
    submitError: undefined,
    email: {
      error: undefined,
    },
    password: {
      error: undefined,
    },
  })
  const { submitError, isSubmitting, email, password } = formValue

  const handleChange = (fieldName: 'email' | 'password', value: string) => {
    const error = validation.validate(fieldName, value)

    setFormValue((old) => ({
      ...old,
      [fieldName]: {
        error,
      },
    }))
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setFormValue((old) => ({
      ...old,
      isSubmitting: true,
    }))
  }

  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col items-center px-4">
        <form
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

          <a
            data-testid="sign-up-link"
            href="/sign-up"
            className="mt-4 text-center lowercase text-primary hover:underline"
          >
            Sign Up
          </a>

          <FormStatus error={submitError} isLoading={isSubmitting} />
        </form>
      </main>

      <Footer />
    </>
  )
}
