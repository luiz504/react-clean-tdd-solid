import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MakeSignIn } from '../factories/pages/sign-in/sign-in-factory'
import { MakeSignUp } from '../factories/pages/sign-up/sign-up-factory'
import { Surveys } from '~/presentation/pages/Surveys'
import { ApiContextProvider } from '~/presentation/context/api-context/provider'

export const Router: FC = () => {
  return (
    <ApiContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<MakeSignIn />} />
          <Route path="/sign-up" element={<MakeSignUp />} />
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
    </ApiContextProvider>
  )
}
