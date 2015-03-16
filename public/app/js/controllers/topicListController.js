angular.module('app').controller('topicListController', function($scope, topicResource){
	$scope.topics = topicResource.query();

	$scope.sortOptions = [{value: 'title', text: "Sort by title"}];
	$scope.sortOrder = $scope.sortOptions[0].value;
});