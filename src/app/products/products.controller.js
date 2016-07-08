/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($location) {
    var vm = this;
    vm.product = {};
    vm.types = ['Over Ear', 'In Ear', 'Ear Bud', 'Clip On'];
    var config = {
      apiKey: "AIzaSyDmwrDGBbkgHm8zP1Zd3uGY71nY9xSFVuA",
      authDomain: "doancuoiki-64efd.firebaseapp.com",
      databaseURL: "https://doancuoiki-64efd.firebaseio.com",
      storageBucket: "doancuoiki-64efd.appspot.com"
    };

    firebase.initializeApp(config);
    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();

    var database = firebase.database();
    console.log(database);

    vm.images = [];

    vm.deleteByName = function (index,image) {
      var desertRef = storageRef.child(image.name);
      console.log(index);
      vm.images.splice(index, 1);

      desertRef.delete().then(function() {
        // File deleted successfully
        console.log(" File deleted successfully");
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
    }

    vm.backHome = function () {
      $location.path("/");
      $location.replace();
    }

    vm.addUser = function () {
      var eimages = [];
      vm.images.forEach(function (item, index) {
        var cimg = {name: encodeURI(item.name), url: encodeURI(item.url)};
        eimages.push(cimg);
      });
      vm.product.images = eimages;
      var newPostKey = database.ref().child('products').push().key;
      var updates = {};
      updates['/products/' + newPostKey] = vm.product;
      return database.ref().update(updates);
      console.log(JSON.parse(updates));
      //updates['/products/' +  + '/' + newPostKey] = vm.product;
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

    window.onload = function() {
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
  }





})();
