import { render } from '@testing-library/react'

import { App } from './App'

describe('Component: App', () => {
  it('should render', () => {
    render(<App />)
    expect(1 + 1).toEqual(2)
  })
})
