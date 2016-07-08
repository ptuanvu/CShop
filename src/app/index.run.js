(function() {
  'use strict';

  angular
    .module('cshop')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
