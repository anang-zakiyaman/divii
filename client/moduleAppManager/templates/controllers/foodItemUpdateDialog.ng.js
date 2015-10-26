angular.module("divii")
.controller("AppFoodItemUpdateDialogCtrl", ["$scope", "$mdDialog", "foodItemId",
  function($scope, $mdDialog, foodItemId){

    $scope.foodItem = $scope.$meteorObject(FoodItems, foodItemId, false).subscribe('foodItems');

    $scope.updateFoodItem = function(){
      $scope.foodItem.save().then(function(numberOfDocs){
        $mdDialog.hide($scope.foodItem.title);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.reset = function(){
      $scope.foodItem.reset();
    };

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

  }
]);
