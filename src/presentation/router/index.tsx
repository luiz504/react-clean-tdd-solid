import { FC, ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Factory = {
  makeSignIn: ReactNode
  makeSignUp: ReactNode
}
export const Router: FC<Factory> = (factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={factory.makeSignIn} />
        <Route path="/sign-up" element={factory.makeSignUp} />
      </Routes>
    </BrowserRouter>
  )
}
