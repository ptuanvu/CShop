/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('CartsController', CartsController);

  /** @ngInject */
  function CartsController($rootScope) {
    var vm = this;
    vm.carts = $rootScope.cart;
  }
})();
