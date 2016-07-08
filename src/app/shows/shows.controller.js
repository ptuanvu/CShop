/**
 * Created by monster on 08/07/2016.
 */
(function () {
  'use strict';

  angular
    .module('cshop')
    .controller('ShowsController', ShowsController);

  /** @ngInject */
  function ShowsController($timeout, $stateParams, $rootScope) {
    var vm = this;
    vm.operation = $stateParams.catalogID;

    var config = {
      apiKey: "AIzaSyDmwrDGBbkgHm8zP1Zd3uGY71nY9xSFVuA",
      authDomain: "doancuoiki-64efd.firebaseapp.com",
      databaseURL: "https://doancuoiki-64efd.firebaseio.com",
      storageBucket: "doancuoiki-64efd.appspot.com"
    };

    if ($rootScope.c == null) {
      firebase.initializeApp(config);
      vm.auth = firebase.auth();
      $rootScope.c = "2";
    }

    console.log(vm.operation);
    vm.products = [];
    vm.aproducts = [];

    var allProduct = firebase.database().ref('products').limitToLast(100);
    var fetchPosts = function (postsRef) {
      postsRef.on('child_added', function (data) {
        var pr = data.val();
        pr.images[0].url = decodeURI(pr.images[0].url);
        vm.aproducts.push(pr);
      });
    };

    if (vm.operation == 'all') {
      vm.products = [];
      vm.aproducts = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.products = vm.aproducts;
      }, 2000);
    } else if (vm.operation == 'sales') {
      vm.products = [];
      vm.aproducts = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.aproducts.forEach(function (item, index) {

          if (item.km > 0) {
            vm.products.push(item);
          }
        });
      }, 2000);
    } else if (vm.operation == 'overear') {
      vm.products = [];
      vm.aproducts = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.aproducts.forEach(function (item, index) {

          if (item.type == 'Over Ear') {
            vm.products.push(item);
          }
        });
      }, 2000);
    } else if (vm.operation == 'inear') {
      vm.products = [];
      vm.aproducts = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.aproducts.forEach(function (item, index) {

          if (item.type == 'In Ear') {
            vm.products.push(item);
          }
        });
      }, 2000);
    } else if (vm.operation == 'earbud') {
      vm.products = [];
      vm.aproducts = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.aproducts.forEach(function (item, index) {

          if (item.type == 'Ear Bud') {
            vm.products.push(item);
          }
        });
      }, 2000);
    } else if (vm.operation == 'clipon') {
      vm.products = [];
      vm.aproducts = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.aproducts.forEach(function (item, index) {

          if (item.type == 'Clip On') {
            vm.products.push(item);
          }
        });
      }, 2000);
    } else if (vm.operation == 'hot') {
      vm.products = [];
      vm.aproducts = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.aproducts.forEach(function (item, index) {

          if (item.ishot) {
            vm.products.push(item);
          }
        });
      }, 2000);
    }


  }
})();
