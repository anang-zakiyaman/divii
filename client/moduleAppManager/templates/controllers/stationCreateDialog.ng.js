angular.module("divii")
.controller("AppStationCreateDialogCtrl", ["$scope", "$meteor", "$mdDialog", "stations",
  function($scope, $meteor, $mdDialog, stations){

    $scope.station = {
      code: '', sequenceNo: '', name: '', description: '',
      location: {
        city: '', latitude: '', longitude: ''
      }
    };

    $scope.createStation = function() {
      stations.save($scope.station).then(function(numberOfDocs){
        $mdDialog.hide($scope.station.name);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.cancelCreate = function() {
      $mdDialog.cancel();
    };

  }
]);
