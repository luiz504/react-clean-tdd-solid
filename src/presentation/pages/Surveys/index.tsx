import { FC } from 'react'

import { Footer } from '~/presentation/components'
import { HeaderPrivate } from '~/presentation/components/headers/HeaderPrivate'

import { SurveySkeleton } from './components/survey-skeleton'
import { SurveyCard } from './components/survey-card'

export const Surveys: FC = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <HeaderPrivate />

      <main className="mx-auto flex max-w-[800px] flex-1 flex-col p-4 sm:p-10">
        <h1 className="mb-6 text-xl font-bold uppercase text-primary-dark">
          Surveys
        </h1>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SurveyCard />
          <SurveyCard />
          <SurveySkeleton />
        </ul>
      </main>

      <Footer />
    </div>
  )
}
