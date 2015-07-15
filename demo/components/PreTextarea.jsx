
import React from 'react'
import { assign } from 'lodash'

class PreTextarea extends React.Component {

  render () {
    let props = this.props
    let { label, helptext, name, style } = props

    let styles = {
      textarea: assign({
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        lineHeight: '18px',
        whiteSpace: 'pre',
        overflow: 'auto'
      }, style)
    }

    return (
      <div>
        <label
          htmlFor={name}
          className='bold block'>
          {label}
        </label>
        <p className='h5 mb1'>{helptext}</p>
        <textarea
          {...props}
          style={styles.textarea}
          className='col-12 field' />
      </div>
    )
  }

}

export default PreTextarea

