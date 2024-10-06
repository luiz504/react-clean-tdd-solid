import { FC } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Footer } from '~/presentation/components'
import { HeaderPrivate } from '~/presentation/components/headers/HeaderPrivate'
import { makeSkeletonList } from '~/presentation/utils/make-skeleton-list'

import { SurveySkeleton } from './components/survey-skeleton'
import { SurveyCard } from './components/survey-card'

import { FetchSurveys } from '~/domain/use-cases'
import { ErrorFeedback } from './components/error-feedback'
import { AccessDeniedError } from '~/domain/errors'
import { useApiContext } from '~/presentation/context/api-context/hook'

const skeletonItems = makeSkeletonList(4)

type Props = {
  fetchSurveys: FetchSurveys
}
export const Surveys: FC<Props> = ({ fetchSurveys }) => {
  const { signOut } = useApiContext()

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => {
      try {
        return await fetchSurveys.fetch()
      } catch (err) {
        if (err instanceof AccessDeniedError) {
          signOut()
          return []
        }
        throw err
      }
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  })

  const renderGridSection = (isSuccess && data.length > 0) || isLoading

  return (
    <div className="flex min-h-svh flex-col">
      <HeaderPrivate />

      <main className="mx-auto flex w-full max-w-[50rem] flex-1 flex-col p-4 sm:p-10">
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
          <ErrorFeedback
            data-testid="survey-load-error"
            onClickTryAgain={refetch}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
