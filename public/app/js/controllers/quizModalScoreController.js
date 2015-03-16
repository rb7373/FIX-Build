angular.module('app').controller('quizModalScoreController', function($scope, $modalInstance, rate, totalQuestions, totalCorrectQuestions) {
  $scope.rateQuiz = rate;
  $scope.totalQuestions = totalQuestions;
  $scope.totalCorrectQuestions = totalCorrectQuestions;
  $scope.score = Number((totalCorrectQuestions/totalQuestions * 100).toFixed(0));
  $scope.ok = function () {
      $modalInstance.close($scope.rateQuiz);
    };

  $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
  };
});