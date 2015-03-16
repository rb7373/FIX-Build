angular.module('app').factory('userResource', function($resource) {

  var userResource = $resource('/api/users/:id', {_id: "@id"}, {
    update: {method:'PUT', isArray:false}
  });

  userResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  }

  return userResource;

});