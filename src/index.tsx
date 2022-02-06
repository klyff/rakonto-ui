import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App, { history } from './App'
import { hotjar } from 'react-hotjar'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
  hotjar.initialize(2806820, 6)
  history.listen(location => {
    hotjar.stateChange(location.pathname + location.search)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
