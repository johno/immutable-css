
import React from 'react'
import App from './components/App.jsx'
import css from './app.css'
import data from './data'

if (typeof document !== 'undefined') {
  React.render(<App {...data} css={css} />, document)
}

module.exports = function render(locals, callback) {
  var html = React.renderToString(<App {...data} css={css} />)
  callback(null, '<!DOCTYPE html>' + html);
};

