/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('IndexController', IndexController);

  /** @ngInject */
  function IndexController($location, $rootScope) {
    var vm = this;
    vm.types = ['Over Ear', 'In Ear', 'Ear Bud', 'Clip On'];
    $rootScope.cart = [];

    vm.addToCart = function(number, pr) {

      var count = 0;
      $rootScope.cart.forEach(function (item, index) {
        if (item.product.pid == pr.pid) {
          if (angular.isUndefinedOrNull(number)){
            number = 0;
          }
          item.num = number;
          count++;
        }
        console.log(item.product.pid);
      });
      var cart_item = {num: number, product: pr};
      if (count == 0) {
        if (angular.isUndefinedOrNull(number)){
          number = 1;
        }
        $rootScope.cart.push(cart_item);
      }
    }

    vm.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
    vm.openHome = function () {
      $location.path("/");
      $location.replace();
    }
    vm.openContactPage = function () {
      $location.path("/contacts");
      $location.replace();
    }
    vm.openLoginPage = function () {
      $location.path("/login");
      $location.replace();
    }
    vm.goToPage = function (url) {
      $location.path(url);
      $location.replace();
    }
  }
})();
