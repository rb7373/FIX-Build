angular.module('app').factory('translationResource', function($resource) {
  var language = $resource('/api/translation/:language', {language: "@language"}, {
    update: {method:'GET', isArray:false}
  });
  return language;
});