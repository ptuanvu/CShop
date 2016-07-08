/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController() {
    var vm = this;

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
        var url = uploadTask.snapshot.metadata.downloadURLs[0];
        console.log('File available at', url);
        // [START_EXCLUDE]
        document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
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
