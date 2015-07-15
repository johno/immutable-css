
import React from 'react'

class Header extends React.Component {

  render () {
    let { title, description } = this.props

    return (
      <header className='px3'>
        <div className='sm-flex flex-center py3 mb3 border-bottom'>
          <div className='flex-auto'>
            <h1 className='h2 m0'>
              {title}
            </h1>
            <p className='h3 m0'>
              {description}
            </p>
          </div>
          <div>
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
      </header>
    )
  }

}

export default Header

