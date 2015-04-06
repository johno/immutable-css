var getMutations = require('immutable-css/lib/get-mutations')
var isBlank = require('is-blank')
var ace = require('brace')
var fs = require('fs');

var frameworks = {
  basscss: {
    name: 'Basscss',
    content: fs.readFileSync('js/src/frameworks/basscss.css', 'utf8'),
  },
  bootstrap: {
    name: 'Bootstrap',
    content: fs.readFileSync('js/src/frameworks/bootstrap.css', 'utf8'),
  },
  other: { name: 'Other', content: '' }
};

function testImmutability(event) {
  event.preventDefault()

  var immutableCss = document.getElementById('immutablecss').value
  var appCss = window.aceEditor.getValue()
  
  if(isBlank(immutableCss) || isBlank(appCss)) {
    alert('please provide css')
  } else {
    var mutations = getMutations(immutableCss, appCss)
    document.getElementById('test-results').textContent = JSON.stringify(mutations)
  }
}


// Load selected framework
function loadFramework(name) {
  var textarea = document.getElementById('immutablecss');
  var label = document.getElementById('immutablecss-label');
  var framework = frameworks[name];
  if (name === 'other') {
    textarea.readOnly = false;
  } else {
    textarea.readOnly = true;
  }
  textarea.value = framework.content;
  label.textContent = framework.name + ' CSS';
}


;(function() {
  document.getElementById('test-button').addEventListener('click', testImmutability, false)

  document.getElementById('framework-select').addEventListener('change', function(event) {
    var name = event.target.value;
    loadFramework(name);
  }, false);

  var previousMutations = []
  var mutationAnnotations = []
  var editor = ace.edit('appcss')
  var Range = ace.acequire('ace/range').Range

  window.aceEditor = editor

  editor.getSession().setOption('useWorker', false)

  editor.getSession().on('change', function() {
    var mutations = getMutations(
      document.getElementById('immutablecss').value,
      editor.getValue()
    )

    previousMutations.forEach(function(mutationError) {
      // editor.getSession().removeMarker(new Range(mutationError.line, 0, mutationError.line, 200), 'mutation-error', 'fullLine')
      editor.getSession().removeGutterDecoration(mutationError.line - 1, 'mutation-error')
      mutationAnnotations = []
    })

    previousMutations = mutations
    mutations.forEach(function(mutation) {
      // editor.getSession().addMarker(new Range(mutation.line, 0, mutation.line, 200), 'mutation-error', 'fullLine')
      editor.getSession().addGutterDecoration(mutation.line - 1, 'mutation-error')
      mutationAnnotations.push({  
        row: mutation.line - 1,
        column: 0,
        text: mutation.selector + ' was mutated',
        type: 'error'
      })
    })
    
    editor.getSession().setAnnotations(mutationAnnotations)
  })

  loadFramework('basscss');

}())
