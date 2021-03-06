(function() {
  'use strict';

  angular
    .module('cshop')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsController',
        controllerAs: 'pr'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/contacts/contacts.html',
        controller: 'ContactsController',
        controllerAs: 'ct'
      })
      .state('aboutme', {
        url: '/aboutme',
        templateUrl: 'app/single_pages/about_me.html'
      })
      .state('doi_tra_hang', {
        url: '/doi_tra_hang',
        templateUrl: 'app/single_pages/doi_tra_hang.html'
      })
      .state('tai_khoan_ngan_hang', {
        url: '/tai_khoan_ngan_hang',
        templateUrl: 'app/single_pages/tai_khoan_ngan_hang.html'
      })
      .state('the_khach_hang', {
        url: '/the_khach_hang',
        templateUrl: 'app/single_pages/the_khach_hang.html'
      })
      .state('co_hoi_nghe_nghiep', {
        url: '/co_hoi_nghe_nghiep',
        templateUrl: 'app/single_pages/co_hoi_nghe_nghiep.html'
      })
      .state('shows', {
        url: '/shows/:catalogID',
        templateUrl: 'app/shows/shows.html',
        controller: 'ShowsController',
        controllerAs: 'shows'
      })
      .state('detail', {
        url: '/detail/:pid',
        templateUrl: 'app/product_detail/product_detail.html',
        controller: 'DetailController',
        controllerAs: 'dt'
      })
      .state('cart', {
        url: '/cart',
        templateUrl: 'app/cart/cart.html',
        controller: 'CartsController',
        controllerAs: 'ct'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

})();
