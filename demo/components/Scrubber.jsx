
import React from 'react'
import { clone } from 'lodash'

class Scrubber extends React.Component {

  render () {
    let { lines, mutations } = this.props
    let styles = {
      container: {
        position: 'relative',
        width: 24,
        height: '100%',
        backgroundColor: 'rgba(255,0,0,.125)'
      },
      link: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: 'red'
      }
    }

    return (
      <div style={styles.container}>
        {mutations.map(function(mutation, i) {
          let style = clone(styles.link)
          style.top = (mutation.line / lines.length * 100) + '%'
          return (
            <a key={i}
              href={'#L' + mutation.line}
              title={'Go to mutation ' + i + 1}
              style={style}>
            </a>
          )
        })}
      </div>
    )
  }

}

export default Scrubber

