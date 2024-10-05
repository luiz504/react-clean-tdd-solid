import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ApiContextProvider } from '~/presentation/context/api-context/provider'
import { PrivateRoute } from '~/presentation/components/private-route'

import { MakeSignIn, MakeSignUp, MakeSurveys } from '../factories/pages'

export const Router: FC = () => {
  return (
    <ApiContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<MakeSignIn />} />
          <Route path="/sign-up" element={<MakeSignUp />} />
          <Route
            path="/"
            element={<PrivateRoute element={<MakeSurveys />} />}
          />
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
    </ApiContextProvider>
  )
}
