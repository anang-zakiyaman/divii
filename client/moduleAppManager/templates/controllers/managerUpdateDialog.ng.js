angular.module("divii")
.controller("ManagerUpdateDialogCtrl", ["$scope", "$meteor", "$mdDialog", "manager",
  function($scope, $meteor, $mdDialog, manager){

    $scope.manager = manager;

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

    $scope.updateManager = function() {
      $meteor.call('serverUpdateManager', $scope.manager)
      .then(function(data) {
        $mdDialog.hide();
      }, function(error) {
        $scope.errMsg = error;
      });
    };

  }
]);
