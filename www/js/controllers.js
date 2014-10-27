
angular.module('todo.controllers', [  'hellofacebook'  , 'auth' ])
.controller('SideMenuCtrl', function($scope, $location , Projects, $http , $rootScope , $ionicSideMenuDelegate , $cookieStore , hellofacebook , serverurl)  { 
  $scope.setInits = function () {
		  $scope.$watch("currentUser",function(){
				   if($rootScope.currentUser)    
				      $scope.projects = Projects.getUserLinks;
				   else 
				      $scope.projects = Projects.getDefaultLinks;
		  });  	
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
 
  $scope.selectLink = function(project) {
    $location.url(project.link);  	 
    $ionicSideMenuDelegate.toggleLeft(false); 
  } 
      $scope.logout = function () {
         	  if($rootScope.currentUser.provider == "facebook"){
               hellofacebook.logout();              	
             }
              $rootScope.currentUser = null;
              $cookieStore.remove("token");
              $location.url('/login');
              $ionicSideMenuDelegate.toggleLeft(false);
    }
})

.controller('ProfileCtrl',function ($scope , $rootScope , $location) {
   $scope.setInits = function () {
       $rootScope.activeLink = $location.url();
   }

})

.controller('HomeCtrl',function ($scope , Items , $ionicModal , $rootScope , $location) {
   $scope.setInits = function () {
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


    $scope.setItem = function (item) {
       $scope.modal.show();
    }

    $scope.closeItem = function () {
       $scope.modal.hide();
    }
})

.controller('WorkPlaceCtrl',function ($scope , $ionicPopover , $rootScope , $location ) {

   $scope.setInits = function () {
       $rootScope.activeLink = $location.url();
   }


  $ionicPopover.fromTemplateUrl('popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function ($event) {
      $scope.popover.show($event);
  }

});