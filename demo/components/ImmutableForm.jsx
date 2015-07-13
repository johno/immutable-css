
import React from 'react'
import PreTextarea from './PreTextarea.jsx'

class ImmutableForm extends React.Component {

  render () {
    let props = this.props
    let { immutable, onChange } = props
    let styles = {
      immutable: {
        minHeight: '80vh'
      }
    }

    return (
      <form className='p2'>
        <PreTextarea
          label='Immutable Source CSS'
          name='immutable'
          value={immutable}
          onChange={onChange}
          style={styles.immutable} />
      </form>
    )
  }

}

export default ImmutableForm

