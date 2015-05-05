'use strict';

module.exports = function logMutations(mutations) {
  mutations.forEach(function(error) {
    console.log(error.file + '[' +
      'line ' + error.line + ',' +
      'col ' + error.column +
      ']: ' + error.selector + ' was mutated'
    );
  });
};
