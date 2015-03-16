angular.module('app').controller('quizController', function($scope, $modal, $window, quizResource, notifierService, $routeParams, $log) {

  $scope.maxSize = 3;
  $scope.quizQuestions = [];
  $scope.results = [];
  $scope.currentQuestion = undefined;
  $scope.currentIdQuestion = undefined;
  $scope.showCorrectAnswers = false;

  $scope.quiz = quizResource.get({
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
  });


  $scope.totalItems = 1;
  $scope.currentPage = 1;
  $scope.totalQuestionsUnaswered = 0;

  $scope.setPage = function(pageNo) {
    console.log("Page set");
    console.log(pageNo);
    $scope.currentPage = pageNo;
    $scope.currentIdQuestion = $scope.currentPage;
    $scope.currentQuestion = $scope.quizQuestions[$scope.currentIdQuestion - 1];
  };

  $scope.pageChanged = function(pageNo) {
    console.log("Page change");
    console.log(pageNo);
    $scope.currentIdQuestion = pageNo;
    $scope.currentQuestion = $scope.quizQuestions[$scope.currentIdQuestion - 1];
  };


  $scope.getStatusQuiz = function() {
    $scope.totalQuestionsUnaswered = 0;
    angular.forEach($scope.quizQuestions, function(question) {
      if (question.selectedAnswer == undefined) {
        $scope.totalQuestionsUnaswered++;
      }
    });

    if ($scope.totalQuestionsUnaswered == 0) {
      return 'Definitive answers?';
    } else if ($scope.totalQuestionsUnaswered == 1) {
      return 'There is one unanswered question';
    } else {
      return 'There are ' + $scope.totalQuestionsUnaswered.toString() + ' unanswered questions';
    }

  };

  $scope.getScore = function(){
    $scope.totalCorrectQuestions = 0;
    angular.forEach($scope.quizQuestions, function(question) {
      if (question.type == 'True-False' | question.type == 'Multichoice'){
        if (question.selectedAnswer == question.answers[0]) {
          $scope.totalCorrectQuestions++;
        }
      }
    });
    console.log('Total questions: ' + $scope.totalQuestions);
    console.log('Correct: ' + $scope.totalCorrectQuestions);
  }

  $scope.getQuizScore = function(size) {
    $scope.getScore();
    var modalInstance = $modal.open({
      templateUrl: "/partials/partials/quizModalScorePartial",
      controller: 'quizModalScoreController',
      windowClass: 'center-modal',
      size: size,
      resolve: {
        rate: function() {
          return $scope.rate;
        },
        totalQuestions: function() {
          return $scope.totalQuestions;
        },
        totalCorrectQuestions: function() {
          return $scope.totalCorrectQuestions;
        }
      }
    });

    modalInstance.result.then(function(newRate) {
      $scope.rate = newRate;
      console.log("new rate: " + newRate);
      $scope.showCorrectAnswers = true;
    }, function() {
      console.log('Modal dismissed at: ' + new Date());
      $scope.showCorrectAnswers = true;
    });

  };

});