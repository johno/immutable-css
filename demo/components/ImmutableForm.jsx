
import React from 'react'
import PreTextarea from './PreTextarea.jsx'
import Select from './Select.jsx'

class ImmutableForm extends React.Component {

  render () {
    let props = this.props
    let { immutable, library, libraries, onChange } = props
    let styles = {
      immutable: {
        minHeight: '40vh'
      }
    }

    let libraryOptions = libraries.map(function(lib, i) {
      return {
        value: i,
        label: lib.name
      }
    })
    //[
    //  { value: 0, label: 'Basscss' },
    //  { value: 1, label: 'Tachyons' },
    //]

    return (
      <form className='p3'>
        <div className='mb2'>
          <Select
            label='Vendor Library'
            name='library'
            value={library}
            options={libraryOptions}
            onChange={onChange} />
        </div>
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

