import React from 'react'
import ReactDOM from 'react-dom/client'

import '~/presentation/styles/global.css'
import { App } from '~/presentation/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
