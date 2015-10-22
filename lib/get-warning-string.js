'use strict'

module.exports = function getWarningString (mutations) {
  var warning = mutations[0].selector + ' was mutated ' + mutations.length + ' times\n'

  mutations.forEach(function (mutation) {
   warning += '[line ' + mutation.line + ', col ' + mutation.column + ']: ' + mutation.rule.source.input.from + '\n'
  })

  return warning
}
