
import React, { Component } from 'react'
import { throttle } from 'lodash'
import HighlightTextarea from './HighlightTextarea.jsx'
import Scrubber from './Scrubber.jsx'

class Results extends Component {

  render () {
    let { immutable, custom, mutations, onChange, getMutations } = this.props

    let lines = custom.split('\n')

    let styles = {
      scrubber: {
        position: 'fixed',
        top: 16,
        right: 16,
        bottom: 16,
      }
    }

    return (
      <div className='p3'>
        <h3>{mutations.length} mutations found</h3>
        <div style={styles.scrubber}>
          <Scrubber {...this.props}
            lines={lines} />
        </div>
        <HighlightTextarea
          label='Custom CSS'
          name='custom'
          value={custom}
          mutations={mutations}
          onChange={onChange} />
        {/*
        <div>
          {mutations.map(function(mutation, i) {
            return (
              <div key={i}>
                <pre>{mutations.line} {customLines[mutation.line - 1]}</pre>
              </div>
            )
          })}
        </div>
        */}
        {/*
        <pre>{JSON.stringify(mutations, null, '  ')}</pre>
        */}
      </div>
    )
  }

}

export default Results

