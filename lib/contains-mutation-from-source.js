'use strict'

module.exports = function containsMutationFromSource (source, mutations) {
  return mutations.some(function (mutation) {
    return mutation.rule.source.input.from === source
  }) 
}
