import { Router } from './router'

import { MakeSignIn } from '~/main/factories/pages/sign-in/sign-in-factory'
import { MakeSignUp } from '~/main/factories/pages/sign-up/sign-up-factory'

export function App() {
  return <Router MakeSignIn={<MakeSignIn />} MakeSignUp={<MakeSignUp />} />
}
