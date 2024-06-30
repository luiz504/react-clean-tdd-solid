import { FC, ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from '../pages/Sign-up'

type Props = {
  MakeSignIn: ReactNode
}
export const Router: FC<Props> = ({ MakeSignIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={MakeSignIn} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
