import { FC, ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {
  MakeSignIn: ReactNode
}
export const Router: FC<Props> = ({ MakeSignIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={MakeSignIn} />
      </Routes>
    </BrowserRouter>
  )
}
