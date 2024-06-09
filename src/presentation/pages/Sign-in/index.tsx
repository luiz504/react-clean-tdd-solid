import { FC, useState } from 'react'
import { cn } from '~/presentation/utils/cn'

import { Input } from '~/presentation/components/Input'
import { Footer } from '~/presentation/components/Footer'

import { Header, FormStatus } from './components'

export const SignIn: FC = () => {
  const [
    formValue,
    //  setFormValue
  ] = useState({
    isSubmitting: false,
    submitError: '',
    emailError: '',
    pwError: '',
  })
  const { submitError, isSubmitting, emailError, pwError } = formValue

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
        >
          <h2 className="text-center text-xl font-bold uppercase text-primary-dark">
            Sign In
          </h2>
          <Input>
            <Input.InputField
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="Email"
            />
            <Input.Error data-testid="email-error" error={emailError} />
          </Input>

          <Input>
            <Input.InputField
              data-testid="pw-input"
              type="password"
              name="password"
              placeholder="Password"
            />
            <Input.Error data-testid="pw-error" error={pwError} />
          </Input>

          <button
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
