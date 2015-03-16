 angular.module('app').factory('identityService', function($window, userResource){
	var currentUser;
	if (!!$window.bootstrappedUserObject){
		currentUser = new userResource();
		angular.extend(currentUser, $window.bootstrappedUserObject);
	}
	return {
	    currentUser: currentUser,
	    isAuthenticated: function() {
	      return !!this.currentUser;
	    },
	    isAuthorized: function(role) {
	      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
	    }
	}
});