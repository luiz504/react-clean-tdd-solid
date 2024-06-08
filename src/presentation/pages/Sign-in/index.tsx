import { FC } from 'react'
import { Input } from '~/presentation/components/Input'
import { Spinner } from '~/presentation/components/Spinner'
import { cn } from '~/presentation/utils/cn'

export const SignIn: FC = () => {
  const error = 'Invalid credentials'
  return (
    <>
      <header
        className={cn(
          'flex flex-col items-center px-4 py-10',
          'bg-gradient-to-b from-primary-dark to-primary',
        )}
      >
        <img className="h-[87px]" src="/logo.svg" alt="logo" />

        <h1 className="mt-4 text-sm font-bold text-white">
          4Dev - Polls for programmers
        </h1>
      </header>

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
      <footer className="h-12 bg-primary" />
    </>
  )
}
