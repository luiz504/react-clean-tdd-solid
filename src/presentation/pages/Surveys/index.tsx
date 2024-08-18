import { FC } from 'react'
import { ThumbsUp } from 'lucide-react'

import { cn } from '~/presentation/utils/cn'

import { Footer } from '~/presentation/components'
import { HeaderPrivate } from '~/presentation/components/headers/HeaderPrivate'

export const Surveys: FC = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <HeaderPrivate />

      <main className="mx-auto flex max-w-[800px] flex-1 flex-col p-10">
        <h1 className="mb-6 text-xl font-bold uppercase text-primary-dark">
          Surveys
        </h1>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <li className="flex flex-col justify-between rounded-md p-2">
            <div className="card-bg relative flex flex-1 gap-6 rounded-t-md pb-4 pr-4 pt-6">
              <button
                className={cn(
                  'absolute -right-2 -top-2 flex items-center rounded-full bg-white p-2 shadow-md',
                )}
              >
                <ThumbsUp size={16} />
              </button>
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
