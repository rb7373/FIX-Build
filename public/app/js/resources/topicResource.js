angular.module('app').factory('topicResource', function($resource) {
  var topicById = $resource('/api/topics/:_id', {_id: "@id"}, {
    update: {method:'GET', isArray:false}
  });

  return topicById;
});