
import React from 'react'
import MutationPre from './MutationPre.jsx'

class Mutations extends React.Component {

  render () {
    let { custom, mutations } = this.props

    let lines = custom.split('\n')

    mutations = mutations.map(function(mutation) {
      let code = []
      let offset = 0
      for (var i = -4; i < 3; i++) {
        if (mutation.line + i > -1) {
          offset = offset || mutation.line + 1 + i
          code.push(lines[mutation.line + i])
        }
      }
      mutation.offset = offset
      mutation.text = code.join('\n')
      return mutation
    })

    return (
      <div>
        <h2>{mutations.length} mutations found</h2>
        <div>
          {mutations.map(function(mutation, i) {
            return (
              <div key={i} className='mb3'>
                <h4><code className='red'>{mutation.selector}</code> on line {mutation.line}</h4>
                <MutationPre {...mutation} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

export default Mutations

