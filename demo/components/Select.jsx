
import React from 'react'

class Select extends React.Component {

  render () {
    let props = this.props
    let { label, name, helptext, options } = props

    return (
      <div>
        <label
          htmlFor={name}
          className='bold block'>
          {label}
        </label>
        <p className='h5 mb1'>{helptext}</p>
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

