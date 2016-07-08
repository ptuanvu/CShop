/**
 * Created by monster on 08/07/2016.
 */
(function() {
  'use strict';

  angular
    .module('cshop')
    .controller('ContactsController', ContactsController);

  /** @ngInject */
  function ContactsController($timeout) {




    this.initHNMap = function(map_id) {
      $timeout(function () {
        var mapDiv = document.getElementById(map_id);
        var map = new google.maps.Map(mapDiv, {
          zoom:16,center:new google.maps.LatLng(10.7715432,106.68058109999993),mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(10.7715432,106.68058109999993)});
        var infowindow = new google.maps.InfoWindow({content:'<strong>Xuân Vũ Hà Nội</strong><br>165 Láng Hạ , Đống Đa, Hà Nội. <br>'});
        google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});
        infowindow.open(map,marker);
      }, 1000);
    }
    this.initHNMap('map');
    this.initHCMMap = function(map_id) {
      $timeout(function () {
        var mapDiv = document.getElementById(map_id);
        var map = new google.maps.Map(mapDiv, {
          zoom:16,center:new google.maps.LatLng(10.7715432,106.68058109999993),mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(10.7715432,106.68058109999993)});
        var infowindow = new google.maps.InfoWindow({content:'<strong>Xuân Vũ TP Hồ Chí Minh</strong><br>98 Cao Thắng, Ho Chi Minh City, Ho Chi Minh, Vietnam<br>'});
        google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});
        infowindow.open(map,marker);
      }, 1000);
    }
  }
})();
