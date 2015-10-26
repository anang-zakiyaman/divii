angular.module("divii")
.controller("ManagerResetPasswordDialogCtrl", ["$scope", "$meteor", "$mdDialog", "managerId",
  function($scope, $meteor, $mdDialog, managerId){

    $scope.password = '';

    $scope.cancelReset = function() {
      $mdDialog.cancel();
    };
    $scope.resetPassword = function() {
      // reset user's password
      $meteor.call('serverResetPassword', managerId, $scope.password)
      .then(function(data) {
        $mdDialog.hide();
      }, function(error){
        $scope.errMsg = error;
      });
    };

  }
]);
