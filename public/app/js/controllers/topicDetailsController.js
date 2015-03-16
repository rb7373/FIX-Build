angular.module('app').controller('topicDetailsController', function($scope, topicResource, $routeParams){
	$scope.topic = topicResource.get({_id:$routeParams.id});
});
