
import React from 'react'
import immutablecss from '../..'
import PreTextarea from './PreTextarea.jsx'

class Results extends React.Component {

  render () {
    let { immutable, custom, onChange } = this.props

    let styles = {
      pre: {
        minHeight: '80vh'
      }
    }

    let results = immutablecss(immutable, custom)

    return (
      <div>
        <PreTextarea
          label='Custom CSS'
          name='custom'
          value={custom}
          onChange={onChange}
          style={styles.pre} />
        <pre>{JSON.stringify(results, null, '  ')}</pre>
      </div>
    )
  }

}

export default Results

