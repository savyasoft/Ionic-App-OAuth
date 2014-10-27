angular.module('todo.factories', [ 'ngCookies' ])
.factory('Projects', function() {
  return {
  	
     getUserLinks : [
	                      { title : "Home" , link : "/home" , icon : "icon ion-home" } , 
	                      { title : "Work Place" , link : "/workplace" , icon : "icon ion-clipboard" }, 
	                      { title : "Profile" , link : "/profile" , icon : "icon ion-gear-b" } 
     ],   	
  	
     getDefaultLinks : [ 
                      { title : "Login" , link : "/login" , icon : "icon ion-log-in" }  , 
                      { title : "Sign up" , link : "/register" , icon : "icon ion-log-in" }  ,
                    ]

  }
})
.factory('Items', function() {
     return{
        getItems : function () {
           Items = [ 'item 1' , 'item 2' ,  'item 3' , 'item 4'  ];        	
        	 
           return Items;        
        }    
     }

}).factory('LoggedUser',function ($rootScope) {
   var user = localSorage.getItem("user") || null; 

   return {
      currentUser : user    
   }

});
