angular.module('app').controller('signinController', function($scope, $http, identityService, notifierService, authService, $location) {
	$scope.identity = identityService;
	$scope.signin = function(email, password) {
		authService.authenticateUser(email, password).then(function(success) {
			if (success) {
				notifierService.notify('You have successfully signed in!');
				$location.path('/');
			} else {
				notifierService.notifyError('Email or password combination incorrect...');
			}
		});
	};
});