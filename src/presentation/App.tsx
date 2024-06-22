import { MakeSignIn } from '~/main/factories/pages/sign-in/sign-in-factory'
import { Router } from './router'

export function App() {
  return <Router MakeSignIn={<MakeSignIn />} />
}
