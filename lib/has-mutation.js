'use strict'

var containsImmutablePrefix = require('./contains-immutable-prefix')

module.exports = function hasMutation (mutationClass, mutationsMap, opts) {
  return (mutationsMap[mutationClass].length > 1 ||             // class has been seen
          opts.immutableClasses.indexOf(mutationClass) !== -1 || // is contained in the immutable classes array
          containsImmutablePrefix(mutationClass, opts)) &&      // is an immutable prefix
         opts.ignoredClasses.indexOf(mutationClass) === -1       // is not in the ignored classes array
}
