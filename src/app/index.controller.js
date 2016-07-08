/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('IndexController', IndexController);

  /** @ngInject */
  function IndexController($location) {
    var vm = this;

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
  }
})();
