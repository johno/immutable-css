
import React from 'react'

class MutationPre extends React.Component {

  render () {
    let { text, offset, line } = this.props

    let lines = text.split('\n').map(function(l, i) {
      if (i === line - offset) {
        return '<span class="red">' + l + '</span>'
      } else {
        return l
      }
    })
    let height = (lines.length) * 18
    let lineNumberWidth = (offset.toFixed().length + 1) * 10

    let styles = {
      container: {
        position: 'relative',
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        fontSize: 13,
        lineHeight: '18px',
        height: height
      },
      highlight: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: (line - offset) * 18,
        height: 18,
      },
      lineNumbers: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        textAlign: 'right',
        paddingRight: 4,
        width: lineNumberWidth,
      },
      lineNumber: {
        height: 18,
        width: lineNumberWidth
      },
      pre: {
        position: 'relative',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        padding: 0,
        paddingLeft: lineNumberWidth + 8,
        height: height,
        border: 0,
        borderRadius: 0
      }
    }

    let lineNumbers = lines.map(function(line, i) {
      return (
        <div key={i}
          style={styles.lineNumber}>
          {i + offset}
        </div>
      )
    })

    return (
      <div style={styles.container}>
        <div
          className='bg-blue-a2'
          style={styles.highlight} />
        <div
          className='blue-a1 bg-blue-a1'
          style={styles.lineNumbers}>
          {lineNumbers}
        </div>
        <pre
          className='bg-blue-a1'
          style={styles.pre}
          dangerouslySetInnerHTML={{ __html: lines.join('\n') }} />
      </div>
    )
  }

}

export default MutationPre

