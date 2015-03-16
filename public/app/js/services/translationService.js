angular.module('app').service('translationService', function(translationResource) {

  this.getTranslation = function($scope, language) {
    console.log(language);
    translationResource.get({
        language: language
      },
      function(data) {
        $scope.translation = data;
      },
      function(error) {
        notifierService.notifyError("Error from server: languages not found");
        $window.location = '/';
      });
  };
});




/*  $scope.quiz = quizResource.get({
    topic: $routeParams.topic
  }, function() {
    $scope.title = $scope.quiz.title;
    $scope.quizQuestions = $scope.quiz.questions;
    $scope.totalItems = $scope.quizQuestions.length * 10;
    $scope.totalQuestions = $scope.totalItems / 10;
    $scope.currentIdCuestion = 1;
    $scope.currentPage = $scope.currentIdCuestion;
    $scope.currentQuestion = $scope.quizQuestions[$scope.currentIdCuestion - 1];
    $scope.likes = 129;
    $scope.dislikes = 0;
  }, function(error) {
    notifierService.notifyError("Error from server: Quices not found");
    $window.location = '/';
  });*/