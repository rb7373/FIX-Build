angular.module('app').controller('signupController', function($scope, $location, notifierService, authService, userResource) {

  $scope.minLenName = 3;
  $scope.maxLenName = 20;
  $scope.minLenLastName = 3;
  $scope.maxLenLastName = 30;
  $scope.minLenEmail = 3;
  $scope.maxLenEmail = 30;
  $scope.minLenPassword = 8;
  $scope.maxLenPassword = 20;

  $scope.signupUser = function() {
    var newUserData = {
      username: $scope.newUser.email,
      password: $scope.newUser.password,
      firstName: $scope.newUser.name,
      lastName: $scope.newUser.lastName
    };
    authService.createUser(newUserData).then(function() {
      notifierService.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      notifierService.notifyError(reason);
    });

  }



});