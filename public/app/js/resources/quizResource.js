angular.module('app').factory('quizResource', function($resource) {
  var quizByTopic = $resource('/api/topics/practices/:topic', {topic: "@topic"}, {
    update: {method:'GET', isArray:false}
  });

  return quizByTopic;
});