import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Footer } from '~/presentation/components'
import { HeaderPrivate } from '~/presentation/components/headers/HeaderPrivate'
import { makeSkeletonList } from '~/presentation/utils/make-skeleton-list'

import { SurveySkeleton } from './components/survey-skeleton'
import { SurveyCard } from './components/survey-card'

import { FetchSurveyList } from '~/domain/use-cases'
const skeletonItems = makeSkeletonList(4)

type Props = {
  fetchSurveyList: FetchSurveyList
}
export const Surveys: FC<Props> = ({ fetchSurveyList }) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => await fetchSurveyList.fetch(),
    staleTime: 1000 * 60 * 10,
  })

  const renderGridSection = (isSuccess && data.length > 0) || isLoading

  return (
    <div className="flex min-h-svh flex-col">
      <HeaderPrivate />

      <main className="mx-auto flex max-w-[800px] flex-1 flex-col p-4 sm:p-10">
        <h1 className="mb-6 text-center text-xl font-bold uppercase">
          Surveys
        </h1>
        {renderGridSection && (
          <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {data?.map((survey) => (
              <SurveyCard
                key={survey.id}
                data-testid="survey-card"
                survey={survey}
              />
            ))}
            {isLoading &&
              skeletonItems.map((item) => (
                <SurveySkeleton key={item.id} data-testid="survey-skeleton" />
              ))}
          </ul>
        )}
        {isError && (
          <div
            data-testid="survey-load-error"
            className="flex flex-1 flex-col items-center justify-center"
          >
            <p className="text-center text-lg font-medium text-neutral-500">
              Falha ao carregar surveys
            </p>

            <button className="mt-6 rounded-md bg-primary px-4 py-2 text-white">
              Tentar novamente
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
