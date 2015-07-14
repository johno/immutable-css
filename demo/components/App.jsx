
import React from 'react'
import immutablecss from '../../lib/get-mutations'
import Header from './Header.jsx'
import ImmutableForm from './ImmutableForm.jsx'
import Intro from './Intro.jsx'
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
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.name === 'library') {
      let immutable = this.props.libraries[e.target.value].css
      this.setState({ immutable })
    }
    if (e.target.name === 'custom') {
      this.getMutations()
    }
  }

  getMutations () {
    let { mutations, immutable, custom } = this.state
    try {
      mutations = immutablecss(immutable, custom)
    } catch (e) {
      // console.log(e)
    }
    this.setState({ mutations })
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
      container: {
        height: '100vh'
      },
      left: {
        height: '100%',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      },
      right: {
        height: '100%',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }
    }

    return (
      <div className='clearfix'
        style={styles.container}>
        <div className='sm-col sm-col-5 border-right'
          style={styles.left}>
          <Header title={props.title} />
          <ImmutableForm
            {...props}
            {...state}
            onChange={this.handleChange} />
        </div>
        <div className='sm-col sm-col-7'
          style={styles.right}>
          <Intro />
          <Results
            {...props}
            {...state}
            onChange={this.handleChange}
            getMutations={this.getMutations} />
          <h3>App state</h3>
          <pre>{JSON.stringify(this.state, null, '  ')}</pre>
        </div>
      </div>
    )
  }

}

export default App

