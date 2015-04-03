var getMutations = require('immutable-css/lib/get-mutations')
var isBlank = require('is-blank')
var ace = require('brace')

function testImmutability(event) {
  event.preventDefault()

  var immutableCss = document.getElementById('immutablecss').value
  var appCss = document.getElementById('appcss').value
  
  if(isBlank(immutableCss) || isBlank(appCss)) {
    alert('please provide css')
  } else {
    var mutations = getMutations(immutableCss, appCss)
    document.getElementById('test-results').textContent = JSON.stringify(mutations)
  }
}

;(function() {
  document.getElementById('test-button').addEventListener('click', testImmutability, false)

  var previousMutations = []
  var editor = ace.edit('appcss')
  editor.getSession().on('change', function() {
    var mutations = getMutations(
      document.getElementById('immutablecss').value,
      editor.getValue()
    )

    previousMutations.forEach(function(mutationError) {
      editor.getSession().removeGutterDecoration(mutationError.line - 1, 'mutation-error')
    })

    previousMutations = mutations
    mutations.forEach(function(mutation) {
      editor.getSession().addGutterDecoration(mutation.line - 1, 'mutation-error')
    })
  })
}())
