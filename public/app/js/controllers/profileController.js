angular.module('app').controller('profileController', function($scope, notifierService, authService, userResource, identityService){
  $scope.minLenName = 3;
  $scope.maxLenName = 20;
  $scope.minLenLastName = 3;
  $scope.maxLenLastName = 30;
  $scope.minLenEmail = 3;
  $scope.maxLenEmail = 30;
  $scope.minLenPassword = 8;
  $scope.maxLenPassword = 20;

  console.log(identityService.currentUser.username);
  console.log(identityService.currentUser.firstName);
  console.log(identityService.currentUser.lastName);


  $scope.email = identityService.currentUser.username;
  $scope.name = identityService.currentUser.firstName;
  $scope.lastName = identityService.currentUser.lastName;
  
  $scope.update = function() {
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.name,
      lastName: $scope.lastName
    };

    authService.updateCurrentUser(newUserData).then(function() {
      notifierService.notify('Your user account has been updated');
    }, function(reason) {
      notifierService.notifyError(reason);
    })
  };

  

});