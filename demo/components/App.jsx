
import React from 'react'
import Header from './Header.jsx'
import ImmutableForm from './ImmutableForm.jsx'
import Results from './Results.jsx'

class App extends React.Component {

  constructor () {
    super ()
    this.state = {
      immutable: '',
      custom: '',
      library: 0,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    let { library } = this.state
    let { initialCustom, libraries } = this.props
    this.setState({
      immutable: libraries[library].css,
      custom: initialCustom
    })
  }

  render () {
    let state = this.state
    let props = this.props

    let styles = {
      left: {
        minHeight: '100vh'
      }
    }

    return (
      <div>
        <div className='clearfix'>
          <div className='sm-col sm-col-4 border-right'
            style={styles.left}>
            <Header title={props.title} />
            <ImmutableForm
              {...props}
              {...state}
              onChange={this.handleChange} />
          </div>
          <div className='sm-col sm-col-8 p2'>
            <Results
              {...props}
              {...state}
              onChange={this.handleChange} />
            <pre>{JSON.stringify(this.state, null, '  ')}</pre>
          </div>
        </div>
      </div>
    )
  }

}

export default App

