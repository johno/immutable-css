
import React from 'react'
import PreTextarea from './PreTextarea.jsx'
import Select from './Select.jsx'

class Form extends React.Component {

  render () {
    let props = this.props
    let { immutable, custom, library, libraries, onChange, getMutations } = props
    let libraryOptions = libraries.map(function(lib, i) {
      return {
        value: i,
        label: lib.name
      }
    })

    return (
      <div>
        <div className='clearfix'>
          <div className='sm-col sm-col-5 px3'>
            <div className='mb2'>
              <PreTextarea
                label='Immutable Source CSS'
                helptext='Paste base library styles here.'
                name='immutable'
                rows={9}
                value={immutable}
                onChange={onChange} />
            </div>
            <div className='mb2'>
              <Select
                label='Load Vendor Library'
                name='library'
                value={library}
                options={libraryOptions}
                onChange={onChange} />
            </div>
          </div>
          <div className='sm-col sm-col-7 px3'>
            <div className='mb2'>
              <PreTextarea
                label='Custom CSS'
                helptext='Paste application-specific styles here.'
                name='custom'
                rows={14}
                value={custom}
                onChange={onChange} />
            </div>
          </div>
        </div>
        <div className='right-align px3'>
          <hr className='mb2' />
          <button
            className='btn btn-primary bg-black'
            onClick={getMutations}>
            Check CSS
          </button>
        </div>
      </div>
    )
  }

}

export default Form

