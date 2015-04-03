var getMutations = require('immutable-css/lib/get-mutations')
var isBlank = require('is-blank')

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
}())


