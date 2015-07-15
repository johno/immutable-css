
import React from 'react'

class About extends React.Component {

  render () {
    return (
      <div>
        <h3>About</h3>
        <p>
          Best practices suggest avoiding overriding styles from vendor libraries to prevent unwanted side effects.
          Base library styles should not be altered – or as Harry Roberts describes, base styles should be treated as <a href='http://csswizardry.com/2015/03/immutable-css/'>Immutable CSS</a>.
        </p>
        <p>
          Made by <a href='https://twitter.com/4lpine'>@4lpine</a> and <a href='http://jxnblk.com'>Jxnblk</a>.
        </p>
      </div>
    )
  }

}

export default About

