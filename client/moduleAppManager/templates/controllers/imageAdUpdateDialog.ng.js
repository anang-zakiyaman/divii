angular.module("divii")
.controller("ImageAdUpdateDialogCtrl", ["$scope", "$mdDialog", "imageAdId",
  function($scope, $mdDialog, imageAdId){

    $scope.imageAd = $scope.$meteorObject(imageAds, imageAdId, false).subscribe('imageAds');

    $scope.updateImageAd = function(){
      $scope.imageAd.save().then(function(numberOfDocs){
        $mdDialog.hide($scope.imageAd.code);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.reset = function(){
      $scope.imageAd.reset();
    };

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

  }
]);
