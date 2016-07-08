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

    vm.addToCart = function(pr) {
      var cart_item = "";
      $rootScope.cart;
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
    vm.goToPage = function (url) {
      $location.path(url);
      $location.replace();
    }
  }
})();
