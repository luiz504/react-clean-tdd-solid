import { FC } from 'react'
import { Footer } from '~/presentation/components'
import { cn } from '~/presentation/utils/cn'

export const Surveys: FC = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <header
        className={cn(
          'flex justify-center px-4 py-10',
          'bg-gradient-to-b from-primary-dark to-primary',
        )}
      >
        <div className="flex max-w-[800px] grow items-center justify-between">
          <img className="h-[60px]" src="/logo.svg" alt="logo" />

          <div className="flex flex-col items-end gap-1 text-white">
            <span>Luiz Bueno</span>
            <button
              type="button"
              className="rounded-lg py-1 text-sm outline-offset-4 transition-colors hover:text-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[800px] flex-1 flex-col p-10">
        <h1 className="mb-6 text-xl font-bold uppercase text-primary-dark">
          Surveys
        </h1>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <li className="flex flex-col justify-between rounded-md p-2">
            <div className="card-bg flex flex-1 gap-6 rounded-t-md">
              <time className="flex h-fit flex-col items-center justify-center self-center rounded-md bg-primary-light px-5 py-2 font-medium text-white">
                <span className="text-4xl font-bold">22</span>
                <span className="my-1 lowercase">May</span>
                <span>2020</span>
              </time>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
                blanditiis, inventore ea ducimus consectetur voluptate nesciunt
                sint saepe porro suscipit culpa eaque ratione architecto fugit!
                Soluta quam obcaecati quisquam ut?
              </p>
            </div>
            <button className="min-h-10 rounded-b-md bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
              Ver Result
            </button>
          </li>
        </ul>
      </main>

      <Footer />
    </div>
  )
}
