
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


angular.module('todo', ['ionic' , 'todo.controllers' , 'todo.factories'  ])
.constant('$ionicLoadingConfig',{
  template : "loading ... "
})

.config(function($stateProvider, $urlRouterProvider , $httpProvider ) {
/*        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
*/

    var isLoggedIn = function ( $location ,$rootScope , $timeout , $q , $cookies) {
            var deferred = $q.defer();
            $timeout(function () {
                var token = $cookies.token;               
               if(token){
                  $timeout(deferred.resolve);
               } 
               else {         	
                 $timeout(deferred.reject);
                 $location.url('/login');
               }
            },0);  
            return deferred.promise;
     } 

    var isLoggedOut = function ( $location ,$rootScope , $timeout , $q , $cookies) {
            var deferred = $q.defer();
            $timeout(function () {
               //var user = localStorage.getItem("userId");
               var user = $cookies.userId;               
               if(user){
                 $timeout(deferred.reject);
                 $location.url('/home');
               } 
               else {         	
                  $timeout(deferred.resolve);
               }
            },0);  
            return deferred.promise;
     } 

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl : "templates/login.html",
      controller : "LoginCtrl",
      resolve : {
        loggedin : isLoggedOut      
      } 
    })
    .state('register', {
      url: '/register',
      templateUrl : "templates/register.html",
      controller : "RegisterCtrl",
      resolve : {
        loggedin : isLoggedOut      
      } 
    })
    .state('profile', {
      url: '/profile',
      templateUrl : "templates/profile.html",
      controller : "ProfileCtrl",
      resolve : {
        loggedin : isLoggedIn      
      } 
    })
    .state('home', {
      url: '/home',
      templateUrl : "templates/home.html",
      controller : "HomeCtrl"
      ,
      resolve : {
        loggedin : isLoggedIn      
      } 
    })
    .state('workplace', {
      url: '/workplace',
      templateUrl : "templates/workplace.html",
      controller : "WorkPlaceCtrl",
      resolve : {
        loggedin : isLoggedIn      
      } 
    });
    
     $urlRouterProvider.otherwise('/login');

});
