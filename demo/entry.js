
import React from 'react'
import App from './components/App.jsx'
import css from 'style-loader!css-loader!postcss-loader?pack=app!./app.css'
import data from './data'

React.render(<App {...data} />, document.querySelector('#app'))

