import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SignIn } from '../pages/Sign-in'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}
