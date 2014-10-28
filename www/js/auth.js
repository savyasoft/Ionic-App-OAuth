// auth module for authentication for the ionic app to the server app

angular.module("auth", ['ngCookies', 'hellofacebook'])
// server url
.constant("serverurl", "http://localhost:3000/")
    .run(function($rootScope, $http, $cookieStore, $location, serverurl) {

        // cheking for the logged in user when app starts
        var token = $cookieStore.get("token");
        if (token) {
            $http.get(serverurl + 'userById?token=' + token)
                .success(function(responce) {
                    $rootScope.currentUser = responce;
                })
                .error(function(r) {
                    $cookieStore.remove("userId");
                    $cookieStore.remove("token");
                    $location.url('/affiliate');
                    alert("error" + r);
                });
        } else {
            $rootScope.user = null;
        }
    })

// controller for the login functionality
.controller('LoginCtrl', function($scope, $rootScope, $ionicLoading, $http, $location, $cookieStore, hellofacebook, serverurl) {
    $scope.setInits = function() {
        $rootScope.activeLink = $location.url();
        $scope.user = {}
        $scope.error = null;
         $scope.errors = [];
    }

    // login event
    $scope.login = function() {
        // loading message 
        $scope.loading();
        // server REST api call for login 
        $http.post(serverurl + 'login', {
            email: $scope.user.email,
            password: $scope.user.password,
            thirdparty: true
        })
            .success(function(response) {
                $rootScope.currentUser = response.user;
                $cookieStore.put("token", response.token);
                $location.url('/home');
                $scope.hide();
            })
            .error(function(reason) {
                $scope.hide();
                $scope.error = reason;
            })
    }

    // facebook authentication 
    $scope.facebook = function() {
        // loading message 
        $scope.loading();

        // calling login method of hellofacebook module
        var promise = hellofacebook.login();
        promise.then(function(response) {
                $rootScope.currentUser = response.user;
                $cookieStore.put("token", response.token);
                $location.url('/home');
                $scope.hide();
            },
            function(reason) {
                $scope.hide();
                if(Array.isArray(reason)){
		                angular.forEach(reason, function(e) {
		                    $scope.errors.push(e.msg)
		                });
                } else {
                   $scope.error = reason;
                }
            });

    }

    // show the loding message
    $scope.loading = function() {
        $ionicLoading.show();
    }

    // hide the loading message 
    $scope.hide = function() {
        $ionicLoading.hide();
    }
})


// controller for the user registration functionality
.controller('RegisterCtrl', function($scope, $rootScope, $ionicLoading, $http, $location, $cookieStore) {
    $scope.setInits = function() {
        $rootScope.activeLink = $location.url();
        $scope.user = {};
    }
    // registration event
    $scope.register = function() {
        $scope.errors = [];
        if (!($scope.user.email && $scope.user.password &&
            $scope.user.confirmPassword && $scope.user.username && $scope.user.name)) {
            $scope.errors.push("fields must not be empty");
            return;
        }
        if ($scope.user.password !== $scope.user.confirmPassword) {
            $scope.errors.push("Passwords do not match")
            return;
        }
        // loading message 
        $scope.loading();

        // server REST api call for registration 
        $http.post('http://localhost:3000/register', {
            email: $scope.user.email,
            password: $scope.user.password,
            confirmPassword: $scope.user.confirmPassword,
            username: $scope.user.username,
            name: $scope.user.name,
            thirdparty: true
        })
            .success(function(result) {
                $rootScope.currentUser = result.user;
                //$cookieStore.put("userId",user._id);
                $cookieStore.put("token", result.token);
                $scope.hide();
                $location.url('/affiliate');

            })
            .error(function(error) {
                $scope.hide();
                angular.forEach(error, function(e) {
                    $scope.errors.push(e.msg)
                });

            });
    };

    // show the loding message
    $scope.loading = function() {
        $ionicLoading.show();
    }

    // show the loding message
    $scope.hide = function() {
        $ionicLoading.hide();
    }

});
