
import React from 'react'
import TweetButton from './TweetButton.jsx'

class Header extends React.Component {

  render () {
    let { title, description } = this.props

    return (
      <header className='px3'>
        <div className='mb3 border-bottom'>
          <div className='sm-flex flex-center py3 mxn2'>
            <div className='px2 flex-auto'>
              <h1 className='h2 m0'>
                {title}
              </h1>
              <p className='h3 m0'>
                {description}
              </p>
            </div>
            <TweetButton
              className='m2'
              text={title + ': ' + description}
              via='4lpine' />
            <div className=''>
              <a href='//npmjs.com/package/immutable-css'
                className='btn'>
                npm
              </a>
              <a href='//github.com/johnotander/immutable-css'
                className='btn'>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>
    )
  }

}

export default Header

