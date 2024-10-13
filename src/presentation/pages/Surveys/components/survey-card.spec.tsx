import { render, screen } from '@testing-library/react'
import { SurveyCard } from './survey-card'

import { mockSurveyModel } from '~/domain/__test__'

const ELEMENTS_TEST_ID = {
  'thumbs-up-icon': 'thumbs-up-icon',
  'thumbs-down-icon': 'thumbs-down-icon',
  'survey-question': 'survey-question',
  'survey-day': 'survey-day',
  'survey-month': 'survey-month',
  'survey-year': 'survey-year',
} as const

const makeSUT = (survey = mockSurveyModel()) => {
  render(<SurveyCard survey={survey} />)
}

describe('Component: SurveyCard', () => {
  it('should render correctly', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: true,
      date: new Date('2020-05-22T00:00:00'),
    }

    makeSUT(survey)

    expect(
      screen.getByTestId(ELEMENTS_TEST_ID['thumbs-down-icon']),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId(ELEMENTS_TEST_ID['thumbs-up-icon']),
    ).not.toBeInTheDocument()

    expect(
      screen.getByTestId(ELEMENTS_TEST_ID['survey-question']),
    ).toHaveTextContent(survey.question)
    expect(
      screen.getByRole('button', { name: 'Show Result' }),
    ).toBeInTheDocument()

    expect(
      screen.getByTestId(ELEMENTS_TEST_ID['survey-day']),
    ).toHaveTextContent('22')
    expect(
      screen.getByTestId(ELEMENTS_TEST_ID['survey-month']),
    ).toHaveTextContent(/^may$/)
    expect(
      screen.getByTestId(ELEMENTS_TEST_ID['survey-year']),
    ).toHaveTextContent('2020')
  })

  it('should render correctly when didAnswer is false', () => {
    const surveyModel = {
      ...mockSurveyModel(),
      didAnswer: false,
      date: new Date('2020-05-03T00:00:00'),
    }

    makeSUT(surveyModel)

    expect(
      screen.getByTestId(ELEMENTS_TEST_ID['thumbs-up-icon']),
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId(ELEMENTS_TEST_ID['thumbs-down-icon']),
    ).not.toBeInTheDocument()
    expect(
      screen.getByTestId(ELEMENTS_TEST_ID['survey-day']),
    ).toHaveTextContent('03')
  })
})
