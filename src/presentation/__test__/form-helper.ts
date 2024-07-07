import { fireEvent, screen } from '@testing-library/react'

export const populateInputField = (inputId: string, value: string): void => {
  const input = screen.getByTestId(inputId)
  fireEvent.input(input, { target: { value } })
}
