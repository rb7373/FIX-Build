angular.module('app').controller('previewImagesController', function($scope) {
  // Set of Photos
  $scope.photos = [{
    src: '/img/main/0.jpg',
    desc: 'Image 01'
  }, {
    src: '/img/main/1.jpg',
    desc: 'Image 02'
  }, {
    src: '/img/main/2.jpg',
    desc: 'Image 03'
  }, {
    src: '/img/main/3.jpg',
    desc: 'Image 04'
  }];

  // initial image index
  $scope._Index = 0;

  // if a current image is the same as requested image
  $scope.isActive = function(index) {
    return $scope._Index === index;
  };

  // show prev image
  $scope.showPrev = function() {
    $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
  };

  // show next image
  $scope.showNext = function() {
    $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
  };

  // show a certain image
  $scope.showPhoto = function(index) {
    $scope._Index = index;
  };
});