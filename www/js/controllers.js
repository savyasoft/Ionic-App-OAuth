// Controllers of the app

angular.module('todo.controllers', ['hellofacebook', 'auth'])
// controller for the side menu of the ionic app
.controller('SideMenuCtrl', function($scope, $location, Projects, $http, $rootScope, $ionicSideMenuDelegate, $cookieStore, hellofacebook, serverurl) {
    $scope.setInits = function() {
        $scope.$watch("currentUser", function() {
            if ($rootScope.currentUser)
                $scope.projects = Projects.getUserLinks;
            else
                $scope.projects = Projects.getDefaultLinks;
        });
    }

    // switch the side menu on  
    $scope.toggleProjects = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    // click event of the link in side menu
    $scope.selectLink = function(project) {
        $location.url(project.link);
        $ionicSideMenuDelegate.toggleLeft(false);
    }

    // logout event 

    $scope.logout = function() {
        if ($rootScope.currentUser.provider == "facebook") {
            hellofacebook.logout();
        }
        $rootScope.currentUser = null;
        $cookieStore.remove("token");
        $location.url('/login');
        $ionicSideMenuDelegate.toggleLeft(false);
    }
})

//controller for the profile page
.controller('ProfileCtrl', function($scope, $rootScope, $location) {
    $scope.setInits = function() {
        $rootScope.activeLink = $location.url();
    }
})

//controller for the profile page

.controller('HomeCtrl', function($scope, Items, $ionicModal, $rootScope, $location) {
    $scope.setInits = function() {
        $rootScope.activeLink = $location.url();
        $scope.items = Items.getItems();
    }

    // modal
    $ionicModal.fromTemplateUrl('item.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // show modal event
    $scope.setItem = function(item) {
        $scope.modal.show();
    }

    // close modal event
    $scope.closeItem = function() {
        $scope.modal.hide();
    }
});
