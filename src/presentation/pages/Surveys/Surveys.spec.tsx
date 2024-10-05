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
import { FetchSurveysSpy } from '~/presentation/__test__/mock-surveys'

const ELEMENTS_TEST_ID = {
  'survey-skeleton': 'survey-skeleton',
  'survey-card': 'survey-card',
  'survey-load-error': 'survey-load-error',
  'survey-load-error-btn': 'survey-load-error-btn',
} as const

const makeSut = (fetchSurveysSpy = new FetchSurveysSpy()) => {
  render(
    <QueryClientProvider client={queryClient}>
      <Surveys fetchSurveys={fetchSurveysSpy} />
    </QueryClientProvider>,
  )
  return { fetchSurveysSpy }
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
    const { fetchSurveysSpy } = makeSut()
    makeSut()
    expect(
      screen.queryByAltText(ELEMENTS_TEST_ID['survey-load-error']),
    ).not.toBeInTheDocument()
    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('survey-skeleton'),
    )
    expect(fetchSurveysSpy.callCount).toBe(1)
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
    const fetchSurveysSpy = new FetchSurveysSpy()
    vi.spyOn(FetchSurveysSpy.prototype, 'fetch').mockRejectedValueOnce(
      new Error(),
    )

    makeSut(fetchSurveysSpy)
    expect(
      screen.queryByAltText(ELEMENTS_TEST_ID['survey-load-error']),
    ).not.toBeInTheDocument()

    const error = await screen.findByTestId(
      ELEMENTS_TEST_ID['survey-load-error'],
    )
    expect(error).toBeInTheDocument()
  })
  it('should be able to refetch when there is an error', async () => {
    const fetchSurveysSpy = new FetchSurveysSpy()
    vi.spyOn(fetchSurveysSpy, 'fetch').mockImplementation(
      () =>
        // eslint-disable-next-line promise/param-names
        new Promise((_, reject) => setTimeout(() => reject(new Error()), 150)),
    )

    makeSut(fetchSurveysSpy)
    const refetchBtn = await screen.findByTestId(
      ELEMENTS_TEST_ID['survey-load-error-btn'],
    )
    fireEvent.click(refetchBtn)
    const loadingSkeletons = await screen.findAllByTestId(
      ELEMENTS_TEST_ID['survey-skeleton'],
    )
    expect(
      screen.queryByTestId(ELEMENTS_TEST_ID['survey-card']),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId(ELEMENTS_TEST_ID['survey-load-error']),
    ).not.toBeInTheDocument()
    expect(loadingSkeletons).toHaveLength(4)
  })
})
