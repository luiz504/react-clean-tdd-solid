import { render, screen } from '@testing-library/react'
import { Surveys } from '.'
import { FetchSurveyList } from '~/domain/use-cases'
import { SurveyModel } from '~/domain/models'
const ELEMENTS_TEST_ID = {
  'survey-skeleton': 'survey-skeleton',
} as const

class FetchSurveyListSpy implements FetchSurveyList {
  callCount = 0
  async fetch(): Promise<SurveyModel[]> {
    this.callCount += 1
    return Promise.resolve([])
  }
}
const makeSut = () => {
  const fetchSurveyListSpy = new FetchSurveyListSpy()

  render(<Surveys fetchSurveyList={fetchSurveyListSpy} />)
  return { fetchSurveyListSpy }
}
describe('Component: Surveys', () => {
  it('should render 4 survey skeletons when is initial loading', () => {
    makeSut()
    const skeletons = screen.getAllByTestId(ELEMENTS_TEST_ID['survey-skeleton'])
    expect(skeletons).toHaveLength(4)
  })
  it('should call FetchSurveyList on mount', () => {
    const { fetchSurveyListSpy } = makeSut()
    makeSut()

    expect(fetchSurveyListSpy.callCount).toBe(1)
  })
})
