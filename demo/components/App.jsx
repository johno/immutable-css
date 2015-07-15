
import React from 'react'
import { throttle } from 'lodash'
import immutablecss from '../../lib/get-mutations'
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
      console.error(e)
    }
    console.log('getMutations')
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
      left: {
      },
      right: {
        minHeight: '100vh',
        paddingRight: 96,
      }
    }

    return (
      <div className='clearfix'
        style={styles.container}>
        <Header title={props.title} />
        <div className='sm-col sm-col-4'
          style={styles.left}>
          <ImmutableForm
            {...props}
            {...state}
            onChange={this.handleChange} />
        </div>
        <div className='sm-col sm-col-8'
          style={styles.right}>
          <Results
            {...props}
            {...state}
            onChange={this.handleChange}
            getMutations={this.getMutations} />
        </div>
      </div>
    )
  }

}

export default App

