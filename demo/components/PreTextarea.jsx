
import React from 'react'
import { assign } from 'lodash'

class PreTextarea extends React.Component {

  render () {
    let props = this.props
    let { label, name, style } = props

    let styles = {
      textarea: assign({
        fontSize: 12,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        lineHeight: '16px',
        whiteSpace: 'pre',
        overflow: 'auto'
      }, style)
    }

    return (
      <div>
        <label
          htmlFor={name}
          className='h5 bold block'>
          {label}
        </label>
        <textarea
          {...props}
          style={styles.textarea}
          className='col-12 field' />
      </div>
    )
  }

}

export default PreTextarea

