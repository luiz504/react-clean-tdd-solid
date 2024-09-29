import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { Surveys } from '.'

import {
  queryClient,
  QueryClientProvider,
} from '~/presentation/__test__/query-client'
import { FetchSurveyListSpy } from '~/presentation/__test__/mock-survey-list'

const ELEMENTS_TEST_ID = {
  'survey-skeleton': 'survey-skeleton',
  'survey-card': 'survey-card',
  'survey-load-error': 'survey-load-error',
  'survey-load-error-btn': 'survey-load-error-btn',
} as const

const makeSut = (fetchSurveyListSpy = new FetchSurveyListSpy()) => {
  render(
    <QueryClientProvider client={queryClient}>
      <Surveys fetchSurveyList={fetchSurveyListSpy} />
    </QueryClientProvider>,
  )
  return { fetchSurveyListSpy }
}

describe('Page: Surveys', () => {
  beforeEach(() => {
    queryClient.clear()
  })
  it('should render 4 survey skeletons when is initial loading', () => {
    makeSut()
    const skeletons = screen.getAllByTestId(ELEMENTS_TEST_ID['survey-skeleton'])
    expect(
      screen.queryByAltText(ELEMENTS_TEST_ID['survey-load-error']),
    ).not.toBeInTheDocument()
    expect(skeletons).toHaveLength(4)
  })
  it('should call FetchSurveyList on mount', async () => {
    const { fetchSurveyListSpy } = makeSut()
    makeSut()
    expect(
      screen.queryByAltText(ELEMENTS_TEST_ID['survey-load-error']),
    ).not.toBeInTheDocument()
    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('survey-skeleton'),
    )
    expect(fetchSurveyListSpy.callCount).toBe(1)
  })
  it('should render Survey Items on success', async () => {
    makeSut()
    expect(
      screen.queryByAltText(ELEMENTS_TEST_ID['survey-load-error']),
    ).not.toBeInTheDocument()
    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId(ELEMENTS_TEST_ID['survey-skeleton']),
    )

    await waitFor(() =>
      expect(
        screen.getAllByTestId(ELEMENTS_TEST_ID['survey-card']),
      ).toHaveLength(5),
    )
  })
  it('should render an error message if FetchSurveyList fails', async () => {
    const fetchSurveyListSpy = new FetchSurveyListSpy()
    vi.spyOn(fetchSurveyListSpy, 'fetch').mockRejectedValueOnce(new Error())

    makeSut(fetchSurveyListSpy)
    expect(
      screen.queryByAltText(ELEMENTS_TEST_ID['survey-load-error']),
    ).not.toBeInTheDocument()

    const error = await screen.findByTestId(
      ELEMENTS_TEST_ID['survey-load-error'],
    )
    expect(error).toBeInTheDocument()
  })
  it('should be able to refetch when there is an error', async () => {
    const fetchSurveyListSpy = new FetchSurveyListSpy()
    vi.spyOn(fetchSurveyListSpy, 'fetch').mockImplementation(
      () =>
        // eslint-disable-next-line promise/param-names
        new Promise((_, reject) => setTimeout(() => reject(new Error()), 150)),
    )

    makeSut(fetchSurveyListSpy)
    const refetchBtn = await screen.findByTestId(
      ELEMENTS_TEST_ID['survey-load-error-btn'],
    )
    fireEvent.click(refetchBtn)
    const loadingSkeletons = await screen.findAllByTestId(
      ELEMENTS_TEST_ID['survey-skeleton'],
    )

    expect(loadingSkeletons).toHaveLength(4)
  })
})
