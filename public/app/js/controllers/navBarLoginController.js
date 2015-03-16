angular.module('app').controller('navBarLoginController', function($scope, $location, identityService, notifierService, authService) {

  $scope.identity = identityService;

  $scope.signout = function() {
    authService.logoutUser().then(function() {
      notifierService.notify('You have successfully signed out!');
      $location.path('/');
    })
  };


});