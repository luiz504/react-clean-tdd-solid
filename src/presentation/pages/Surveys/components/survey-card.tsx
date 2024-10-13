import { ComponentProps, FC } from 'react'
import { cn } from '~/presentation/utils/cn'
import { LikeActionBtn } from './like-action-btn'
import { SurveyModel } from '~/domain/models'

type Props = ComponentProps<'li'> & {
  survey: SurveyModel
}

export const SurveyCard: FC<Props> = ({ survey, className, ...rest }) => {
  const status = survey.didAnswer ? 'dislike' : 'like'
  const day = survey.date.getDate().toString().padStart(2, '0')
  const month = survey.date
    .toLocaleDateString('en', {
      month: 'short',
    })
    .replace('.', '')
  const year = survey.date.getFullYear()

  return (
    <li
      className={cn(
        'flex flex-col justify-between rounded-md shadow-md',
        className,
      )}
      {...rest}
    >
      <div className="card-bg relative flex flex-1 gap-6 rounded-t-md px-4 pb-4 pt-6">
        <LikeActionBtn className="absolute -right-2 -top-2" status={status} />

        <time className="flex h-fit flex-col items-center justify-center self-center rounded-md bg-primary-light px-5 py-2 font-medium text-white">
          <span data-testid="survey-day" className="text-4xl font-bold">
            {day}
          </span>
          <span data-testid="survey-month" className="my-1 lowercase">
            {month}
          </span>
          <span data-testid="survey-year">{year}</span>
        </time>
        <p data-testid="survey-question" className="text-sm leading-relaxed">
          {survey.question}
        </p>
      </div>
      <button
        data-testid="survey-show-result-btn"
        className="min-h-10 rounded-b-md bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Show Result
      </button>
    </li>
  )
}
