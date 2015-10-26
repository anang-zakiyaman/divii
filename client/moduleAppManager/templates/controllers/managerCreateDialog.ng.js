angular.module("divii")
.controller("ManagerCreateDialogCtrl", ["$scope", "$meteor", "$mdDialog",
  function($scope, $meteor, $mdDialog){

    $scope.manager = {
      username: '',
      password: '',
      profile: { role: '', note: '' }
    };

    $scope.cancelCreate = function() {
      $mdDialog.cancel();
    };

    $scope.createManager = function() {
      $meteor.call('serverCreateManager', $scope.manager)
      .then(function(data) {
        $mdDialog.hide($scope.manager.username);
      }, function(error) {
        $scope.errMsg = error;
      });
    };

  }
]);
