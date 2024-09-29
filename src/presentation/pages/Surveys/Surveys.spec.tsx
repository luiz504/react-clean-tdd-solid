import { render, screen } from '@testing-library/react'
import { Surveys } from '.'
const ELEMENTS_TEST_ID = {
  'survey-skeleton': 'survey-skeleton',
} as const
describe('Component: Surveys', () => {
  it('should render 4 survey skeletons when is initial loading', () => {
    render(<Surveys />)
    const skeletons = screen.getAllByTestId(ELEMENTS_TEST_ID['survey-skeleton'])
    expect(skeletons).toHaveLength(4)
  })
})
