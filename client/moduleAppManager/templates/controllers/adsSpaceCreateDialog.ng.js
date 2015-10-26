angular.module("divii")
.controller("AdsSpaceCreateDialogCtrl", ["$scope", "$meteor", "$mdDialog", "adsSpaces",
  function($scope, $meteor, $mdDialog, adsSpaces){

    $scope.adsSpace = {
      code: '', type: '', title: '', description: '',
      spec: { widthR: '', heightR: '', maxSize: '' }, ads:[]
    };

    $scope.createAdsSpace = function() {
      adsSpaces.save($scope.adsSpace).then(function(numberOfDocs){
        $mdDialog.hide($scope.adsSpace.title);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.cancelCreate = function() {
      $mdDialog.cancel();
    };

  }
]);
