/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('cshop')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant("FBURL", 'https://ang-crud.firebaseio.com/products/')
    .constant('firebaseinit', false);

})();
