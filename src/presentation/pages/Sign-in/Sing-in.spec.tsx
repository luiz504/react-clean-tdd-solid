import { render, screen } from '@testing-library/react'
import { SignIn } from '.'

describe('Page: Sing-in', () => {
  it('should render correctly with initial state', () => {
    render(<SignIn />)
    const formStatus = screen.getByTestId('form-status')

    expect(formStatus).toBeInTheDocument()
    expect(formStatus.childNodes).toHaveLength(0)

    expect(screen.getByTestId('email-input')).toBeEnabled()
    expect(screen.getByTestId('email-input')).toHaveValue('')
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument()

    expect(screen.getByTestId('pw-input')).toBeEnabled()
    expect(screen.getByTestId('pw-input')).toBeEnabled()
    expect(screen.getByTestId('pw-input')).toHaveValue('')

    expect(screen.queryByTestId('pw-error')).not.toBeInTheDocument()

    const link = screen.getByTestId('sign-up-link')
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/sign-up')
  })
})
