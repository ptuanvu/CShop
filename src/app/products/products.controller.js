/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($location, $timeout, $rootScope) {
    var vm = this;
    vm.currentPage = 0;
    vm.pageSize = 10;
    $timeout(function () {
      vm.totalPage = parseInt(vm.products.length/vm.pageSize);
    }, 3000);

    vm.product = {};
    vm.types = ['Over Ear', 'In Ear', 'Ear Bud', 'Clip On'];
    var config = {
      apiKey: "AIzaSyDmwrDGBbkgHm8zP1Zd3uGY71nY9xSFVuA",
      authDomain: "doancuoiki-64efd.firebaseapp.com",
      databaseURL: "https://doancuoiki-64efd.firebaseio.com",
      storageBucket: "doancuoiki-64efd.appspot.com"
    };

    if ($rootScope.c == null) {
      firebase.initializeApp(config);
      $rootScope.c = "2";
    }
    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

    var database = firebase.database();

    vm.images = [];

    vm.deleteByName = function (index,image) {
      var desertRef = storageRef.child(image.name);
      vm.images.splice(index, 1);

      desertRef.delete().then(function() {
        // File deleted successfully
        console.log(" File deleted successfully");
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
    }

    vm.backHome = function () {
      vm.product = [];
      vm.images = [];
    }

    function copyPr(apr) {
      var npr = {};
      npr.name = apr.name;
      npr.images = apr.images;
      npr.bh = apr.bh;
      npr.ishot = apr.ishot;
      npr.km = apr.km;
      npr.pid = apr.pid;
      npr.nsx = apr.nsx;
      npr.price = apr.price;
      npr.type = apr.type;
      npr.detail = apr.detail;
      npr.number = apr.number;
      return npr;
    }

    vm.makeItHot = function (cpr) {
      var cp = firebase.database().ref('products/' + cpr.pid);
      cpr = copyPr(cpr);
      cp.update(cpr);
    }

    vm.addUser = function () {
      var eimages = [];
      vm.images.forEach(function (item, index) {
        var cimg = {name: encodeURI(item.name), url: encodeURI(item.url)};
        eimages.push(cimg);
      });
      vm.product = copyPr(vm.product);
      //vm.product.images = eimages;

      if ( typeof vm.product.pid != 'undefined') {
        var newPostKey =  vm.product.pid;
        var updates = {};
        updates['/products/' + newPostKey] = vm.product;
        var respone = database.ref().update(updates);
      } else {
        var newPostKey = database.ref().child('products').push().key;
        vm.product.pid = newPostKey;
        var updates = {};
        updates['/products/' + newPostKey] = vm.product;
        var respone = database.ref().update(updates);
      }

      vm.product = [];
      vm.images = [];
      console.log(JSON.parse(respone));
      //updates['/products/' +  + '/' + newPostKey] = vm.product;
    }

    vm.products = [];
    var allProduct = firebase.database().ref('products');
    var fetchPosts = function (postsRef) {
      postsRef.on('child_added', function (data) {
        var pr = data.val();
        var imgs = [];
        pr.images.forEach(function (item, index) {
          var image = {name: decodeURI(item.name), url: decodeURI(item.url)};
          imgs.push(image);
        });
        pr.images = imgs;
        vm.products.push(pr);
      });
    };
    fetchPosts(allProduct);
    $timeout(function () {
      vm.products = vm.products;
    }, 3000);

    vm.updateProduct = function (cproduct) {
      vm.product = [];
      vm.images = [];
      vm.product = cproduct;
      cproduct.images.forEach(function (item, index) {
        var image = {name: decodeURI(item.name), url: item.url};
        vm.images.push(image);
      });
    }
    vm.deleteProduct = function (cproduct) {
      var cp = firebase.database().ref('products/' + cproduct.pid);
      cp.remove();
      console.log("Delete");
      vm.products = [];
      fetchPosts(allProduct);
      $timeout(function () {
        vm.products = vm.products;
      }, 3000);
    }

    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];
      var metadata = {
        'contentType': file.type
      };
      // Push to child path.
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
      // Listen for errors and completion of the upload.
      // [START oncomplete]
        uploadTask.on('state_changed', null, function(error) {
          // [START onfailure]
          console.error('Upload failed:', error);
          // [END onfailure]
        }, function() {
          console.log('Uploaded',uploadTask.snapshot.totalBytes,'bytes.');
          console.log(uploadTask.snapshot.metadata);
          var curl = uploadTask.snapshot.metadata.downloadURLs[0];
          var cname = uploadTask.snapshot.metadata.fullPath;
          console.log('File available at', curl);
          // [START_EXCLUDE]
          document.getElementById('linkbox').innerHTML = '<a href="' +  curl + '">Click For File</a>';
          vm.images.push({name:cname, url: curl});
          // [END_EXCLUDE]
        });
      // [END oncomplete]
    }

    function active() {
      document.getElementById('file').addEventListener('change', handleFileSelect, false);
      document.getElementById('file').disabled = true;

      // Sign the user in anonymously since accessing Storage requires the user to be authorized.
      auth.signInAnonymously().then(function(user) {
        console.log('Anonymous Sign In Success', user);
        document.getElementById('file').disabled = false;
      }).catch(function(error) {
        console.error('Anonymous Sign In Error', error);
      });
    }

    active();





  }

})();

