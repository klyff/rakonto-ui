import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App, { history } from './App'
import { hotjar } from 'react-hotjar'

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
