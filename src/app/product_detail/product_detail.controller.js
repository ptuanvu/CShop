/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($timeout, $stateParams, $rootScope) {
    var vm = this;

    var config = {
      apiKey: "AIzaSyDmwrDGBbkgHm8zP1Zd3uGY71nY9xSFVuA",
      authDomain: "doancuoiki-64efd.firebaseapp.com",
      databaseURL: "https://doancuoiki-64efd.firebaseio.com",
      storageBucket: "doancuoiki-64efd.appspot.com"
    };

    Number.prototype.format = function(n, x) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };

    if ($rootScope.c == null) {
      firebase.initializeApp(config);
      $rootScope.c = "2";
    }
    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

    var database = firebase.database();
    vm.products = [];
    vm.pid = $stateParams.pid;


    vm.changeImagePreview = function (url) {
      vm.imagePath = url;
    }


    firebase.database().ref('/products/' + vm.pid).once('value').then(function(snapshot) {

      vm.pr = snapshot.val();
      var imgs = [];
      vm.pr.images.forEach(function (item, index) {
        var image = {name: decodeURI(item.name), url: decodeURI(item.url)};
        imgs.push(image);
      });

      vm.pr.images = imgs;

      $timeout(function () {
        vm.imagePath = vm.pr.images[0].url;
      }, 500);
    });




  }
})();
