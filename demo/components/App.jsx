
import React from 'react'
import { throttle } from 'lodash'
import immutablecss from '../../lib/get-mutations'
import Header from './Header.jsx'
import Form from './Form.jsx'
import Mutations from './Mutations.jsx'
import About from './About.jsx'

class App extends React.Component {

  constructor () {
    super ()
    this.state = {
      immutable: '',
      custom: '',
      library: 0,
      mutations: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.getMutations = this.getMutations.bind(this)
    this.getThrottledMutations = throttle(this.getMutations, 800)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.name === 'library') {
      let immutable = this.props.libraries[e.target.value].css
      this.setState({ immutable }, function() {
        this.getMutations()
      }.bind(this))
    }
    if (e.target.name === 'custom') {
      this.getThrottledMutations()
    }
  }

  getMutations () {
    let { mutations, immutable, custom } = this.state
    try {
      mutations = immutablecss(immutable, custom)
      this.setState({ mutations })
    } catch (e) {
      // console.error(e)
    }
  }

  componentDidMount () {
    let { library } = this.state
    let { initialCustom, libraries } = this.props
    this.setState({
      immutable: libraries[library].css,
      custom: initialCustom
    }, function() {
      this.getMutations()
    }.bind(this))
  }

  render () {
    let state = this.state
    let props = this.props

    let styles = {
      container: {
        minHeight: '100vh'
      },
    }

    return (
      <div className='mb4'
        style={styles.container}>
        <Header {...props} />
        <Form
          {...props}
          {...state}
          onChange={this.handleChange}
          getMutations={this.getMutations} />
        <div className='clearfix'>
          <div className='sm-col-right sm-col-7 px3'>
            <Mutations {...props} {...state} />
          </div>
          <div className='sm-col sm-col-5 px3'>
            <About />
          </div>
        </div>
      </div>
    )
  }

}

export default App

