
import React from 'react'

class Html extends React.Component {

  render () {
    let { title, description, children, css, ga } = this.props

    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body>
          {children}
          <script src='demo/bundle.js' />
          <script dangerouslySetInnerHTML={{ __html: ga }} />
        </body>
      </html>
    )
  }

}

export default Html

