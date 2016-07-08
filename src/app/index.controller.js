/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('IndexController', IndexController);

  /** @ngInject */
  function IndexController($location, $mdDialog) {
    var vm = this;
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.openHome = function () {
      $location.path("/");
      $location.replace();
    }
    this.openContactPage = function () {
      $location.path("/contacts");
      $location.replace();
    }
  }
})();
