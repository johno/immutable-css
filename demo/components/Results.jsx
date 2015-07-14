
import React from 'react'
import { throttle } from 'lodash'
import PreTextarea from './PreTextarea.jsx'

class Results extends React.Component {

  render () {
    let { immutable, custom, mutations, onChange, getMutations } = this.props

    let customLines = custom.split('\n')

    let styles = {
      pre: {
        minHeight: customLines.length * 16
      }
    }

    return (
      <div className='p3'>
        <button onClick={getMutations}>
          Check for Mutations
        </button>
        <PreTextarea
          label='Custom CSS'
          name='custom'
          value={custom}
          onChange={onChange}
          style={styles.pre} />
        <div>
          <h3>{mutations.length} mutations found</h3>
          {mutations.map(function(mutation, i) {
            return (
              <div key={i}>
                <pre>{customLines[mutation.line - 1]}</pre>
              </div>
            )
          })}
        </div>
        <pre>{JSON.stringify(mutations, null, '  ')}</pre>
      </div>
    )
  }

}

export default Results

