angular.module('app').factory('authService', function($http, identityService, $q, userResource) {
  return {
    createUser: function(newUserData) {
      var newUser = new userResource(newUserData);
      var qDefer = $q.defer();
      newUser.$save().then(function() {
      identityService.currentUser = newUser;
        qDefer.resolve();
      }, function(response) {
        qDefer.reject(response.data.reason);
      });
      return qDefer.promise;
    },
    updateCurrentUser: function(newUserData) {
      var qDefer = $q.defer();
      var clone = angular.copy(identityService.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        identityService.currentUser = clone;
        qDefer.resolve();
      }, function(response) {
        qDefer.reject(response.data.reason);
      });
      return qDefer.promise;
    },
    authenticateUser: function(username, password) {
      var qDefer = $q.defer();
      $http.post('/signin', {
        username: username,
        password: password
      }).then(function(response) {
        if (response.data.success) {
          var user = new userResource();
          angular.extend(user, response.data.user);
          identityService.currentUser = user;
          qDefer.resolve(true);
        } else {
          qDefer.resolve(false);
        }
      });
      return qDefer.promise;
    },
    logoutUser: function() {
      var qDefer = $q.defer();
      $http.post('/logout', {
        logout: true
      }).then(function() {
        identityService.currentUser = undefined;
        qDefer.resolve();
      });
      return qDefer.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if(identityService.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },
    authorizeAuthenticatedUserForRoute: function() {
      if(identityService.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
});