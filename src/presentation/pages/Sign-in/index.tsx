import { FC } from 'react'
import { cn } from '~/presentation/utils/cn'

import { Input } from '~/presentation/components/Input'
import { Spinner } from '~/presentation/components/Spinner'
import { Footer } from '~/presentation/components/Footer'

import { Header } from './components/Header'

export const SignIn: FC = () => {
  const error = 'Invalid credentials'
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
            <Input.InputField type="email" name="email" placeholder="Email" />
            <Input.Error error="Invalid email" />
          </Input>

          <Input>
            <Input.InputField
              type="password"
              name="password"
              placeholder="Password"
            />
            <Input.Error error="Invalid password" />
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
            href="/sign-up"
            className="mt-4 text-center lowercase text-primary hover:underline"
          >
            Sign Up
          </a>

          <div className="flex flex-col items-center">
            <Spinner className="mt-8" />
            <span className="mt-8 text-sm text-primary-light">{error}</span>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
