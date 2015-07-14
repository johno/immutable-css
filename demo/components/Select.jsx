
import React from 'react'

class Select extends React.Component {

  render () {
    let props = this.props
    let { label, name, options } = props

    return (
      <div>
        <label
          htmlFor={name}
          className='h5 bold block'>
          {label}
        </label>
        <select {...props}
          className='col-12 field'>
          {options.map(function(option, i) {
            return <option key={i} {...option} />
          })}
        </select>
      </div>
    )
  }

}

export default Select

