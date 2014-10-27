// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


angular.module('todo', ['ionic', 'todo.controllers', 'todo.factories'])
    .constant('$ionicLoadingConfig', {
        template: "loading ... "
    })
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        // checking any user logged in
        var isLoggedIn = function($location, $rootScope, $timeout, $q, $cookies) {
            var deferred = $q.defer();
            $timeout(function() {
                var token = $cookies.token;
                if (token) {
                    $timeout(deferred.resolve);
                } else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            }, 0);
            return deferred.promise;
        };

        // checking no user logged in
        var isLoggedOut = function($location, $rootScope, $timeout, $q, $cookies) {
            var deferred = $q.defer();
            $timeout(function() {
                //var user = localStorage.getItem("userId");
                var token = $cookies.token;
                if (token) {
                    $timeout(deferred.reject);
                    $location.url('/home');
                } else {
                    $timeout(deferred.resolve);
                }
            }, 0);
            return deferred.promise;
        };
        // route for login page 
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: "templates/login.html",
                controller: "LoginCtrl",
                resolve: {
                    loggedin: isLoggedOut
                }
            })
        // route for registration page
        .state('register', {
            url: '/register',
            templateUrl: "templates/register.html",
            controller: "RegisterCtrl",
            resolve: {
                loggedin: isLoggedOut
            }
        })
        // route for profile page
        .state('profile', {
            url: '/profile',
            templateUrl: "templates/profile.html",
            controller: "ProfileCtrl",
            resolve: {
                loggedin: isLoggedIn
            }
        })
        // route for home page
        .state('home', {
            url: '/home',
            templateUrl: "templates/home.html",
            controller: "HomeCtrl",
            resolve: {
                loggedin: isLoggedIn
            }
        });
        $urlRouterProvider.otherwise('/login');
    });
