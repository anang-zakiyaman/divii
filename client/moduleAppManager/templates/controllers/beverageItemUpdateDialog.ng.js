angular.module("divii")
.controller("AppBeverageItemUpdateDialogCtrl", ["$scope", "$mdDialog", "beverageItemId",
  function($scope, $mdDialog, beverageItemId){

    $scope.beverageItem = $scope.$meteorObject(BeverageItems, beverageItemId, false).subscribe('beverageItems');

    $scope.updateBeverageItem = function(){
      $scope.beverageItem.save().then(function(numberOfDocs){
        $mdDialog.hide($scope.beverageItem.title);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.reset = function(){
      $scope.beverageItem.reset();
    };

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

  }
]);
