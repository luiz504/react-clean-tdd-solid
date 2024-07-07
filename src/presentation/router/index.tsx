import { FC, ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {
  MakeSignIn: ReactNode
  MakeSignUp: ReactNode
}
export const Router: FC<Props> = ({ MakeSignIn, MakeSignUp }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={MakeSignIn} />
        <Route path="/sign-up" element={MakeSignUp} />
      </Routes>
    </BrowserRouter>
  )
}
