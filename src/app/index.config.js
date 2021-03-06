(function() {
  'use strict';

  angular
    .module('cshop')
    .config(config)
    .filter('startFrom', customfilter);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  function customfilter() {
    return function (input, start) {
      start = +start;
      return input.slice(start);
    }
  }

})();
