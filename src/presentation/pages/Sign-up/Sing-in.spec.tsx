import { MemoryRouter } from 'react-router-dom'

import { SignUp } from '.'
import { render, screen } from '@testing-library/react'

const makeSut = () => {
  render(
    <MemoryRouter>
      <SignUp />,
    </MemoryRouter>,
  )
}

describe('Page: Sing-up', () => {
  it('should render correctly', () => {
    makeSut()
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
