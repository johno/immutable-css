
import React from 'react'

class Intro extends React.Component {

  render () {
    return (
      <div className='p3'>
        <p>
          Best practices suggest avoiding overriding styles from vendor libraries to prevent unwanted side effects.
          Base library styles should not be altered – or as Harry Roberts describes, base styles should be treated as <a href='http://csswizardry.com/2015/03/immutable-css/'>Immutable CSS</a>.
        </p>
      </div>
    )
  }

}

export default Intro

