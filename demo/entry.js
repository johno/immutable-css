
import React from 'react'
import App from './components/App.jsx'
import css from 'style-loader!./app.css'
import data from './data'

React.render(<App {...data} />, document.querySelector('#app'))

