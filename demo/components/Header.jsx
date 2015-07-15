
import React from 'react'

class Header extends React.Component {

  render () {
    let { title } = this.props

    return (
      <header className='p3 sm-col-8'>
        <h1 className='h3 m0'>
          {title}
        </h1>
        <p>
          Best practices suggest avoiding overriding styles from vendor libraries to prevent unwanted side effects.
          Base library styles should not be altered – or as Harry Roberts describes, base styles should be treated as <a href='http://csswizardry.com/2015/03/immutable-css/'>Immutable CSS</a>.
        </p>
      </header>
    )
  }

}

export default Header

