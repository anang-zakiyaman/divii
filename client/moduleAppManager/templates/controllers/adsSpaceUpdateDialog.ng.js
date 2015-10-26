angular.module("divii")
.controller("AdsSpaceUpdateDialogCtrl", ["$scope", "$mdDialog", "adsSpaceId",
  function($scope, $mdDialog, adsSpaceId){

    $scope.adsSpace = $scope.$meteorObject(AdsSpaces, adsSpaceId, false).subscribe('adsSpaces');

    $scope.updateAdsSpace = function(){
      $scope.adsSpace.save().then(function(numberOfDocs){
        $mdDialog.hide($scope.adsSpace.title);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.reset = function(){
      $scope.adsSpace.reset();
    };

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

  }
]);
