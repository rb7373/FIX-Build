angular.module('app').controller('mainController', function($scope, topicResource, translationService) {
  $scope.topics = topicResource.query();

  //Run translation if selected language changes
  $scope.translate = function(){
       translationService.getTranslation($scope, $scope.selectedLanguage);
   };
   
   //Init
   $scope.selectedLanguage = 'es-cr';
   $scope.translate();

    
});