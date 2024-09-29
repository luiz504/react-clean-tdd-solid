import { render, screen, waitFor } from '@testing-library/react'
import { PrivateRoute } from '.'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const makeSut = () => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute element={<div data-testid="home" />} />}
        />
        <Route path="/login" element={<div data-testid="login" />} />
      </Routes>
    </MemoryRouter>
  )
}
describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', async () => {
    render(makeSut())

    await waitFor(() => {
      expect(screen.getByTestId('login')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('home')).not.toBeInTheDocument()
  })
})
