angular.module('app').controller('adminUserController', function($scope, userResource) {

	$scope.users = userResource.query();

});