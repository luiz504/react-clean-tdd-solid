import { FC, ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Surveys } from '../pages/Surveys'

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
        <Route path="/surveys" element={<Surveys />} />
        <Route
          path="*"
          element={
            <div className="flex flex-1 items-center justify-center text-3xl font-semibold text-primary">
              Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
