// Currently Unused

import React from 'react'
import { clone, max } from 'lodash'

class HighlightTextarea extends React.Component {

  render () {
    let props = this.props
    let { label, name, value, mutations, style } = props

    let lines = value.split('\n')
    let height = 18 * lines.length + 1

    let width = max(lines.map(function(line) {
      return line.length
    }))
    let lineNumberWidth = lines.length.toFixed().length * 12

    let styles = {
      container: {
      },
      inner: {
        position: 'relative',
        fontSize: 14,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        lineHeight: '18px',
        height: height
      },
      highlights: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        lineHeight: '18px',
        //backgroundColor: 'rgba(0,0,255,.125)'
      },
      highlight: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 18,
        backgroundColor: 'rgba(255,0,0,.125)'
      },
      linenumbers: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        lineHeight: '18px',
        width: lineNumberWidth,
        color: 'rgba(0,196,196,.75)',
        backgroundColor: 'rgba(0,255,255,.0625)'
      },
      textareawrap: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: lineNumberWidth,
        overflowX: 'auto',
        overflowY: 'hidden'
      },
      textarea: {
        fontSize: 'inherit',
        lineHeight: '18px',
        whiteSpace: 'pre',
        minHeight: height,
        //width: '100%',
        minWidth: width * 8,
        border: 0,
        padding: 0,
        outline: 'none',
        backgroundColor: 'transparent'
      }
    }

    return (
      <div style={styles.container}>
        <label
          htmlFor={name}
          className='h5 bold block mb1'>
          {label}
        </label>
        <div style={styles.inner}>
          <div style={styles.highlights}>
            {mutations.map(function(mutation, i) {
              let style = clone(styles.highlight)
              style.top = (mutation.line - 1) * 18
              return (
                <div
                  key={i}
                  style={style} />
              )
            })}
          </div>
          <div style={styles.linenumbers}>
            {lines.map(function(line, i) {
              return (
                <div key={i}
                  id={'L' + (i + 1)}>
                  {i + 1}
                </div>
              )
            })}
          </div>
          <div style={styles.textareawrap}>
            <textarea
              {...props}
              wrap='soft'
              style={styles.textarea}
              className='col-12 field' />
          </div>
        </div>
      </div>
    )
  }

}

export default HighlightTextarea

