angular.module("divii")
.controller("AppStationUpdateDialogCtrl", ["$scope", "$mdDialog", "stationId",
  function($scope, $mdDialog, stationId){

    $scope.station = $scope.$meteorObject(Stations, stationId, false).subscribe('stations');

    $scope.updateStation = function(){
      $scope.station.save().then(function(numberOfDocs){
        $mdDialog.hide($scope.station.name);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.reset = function(){
      $scope.station.reset();
    };

    $scope.cancelUpdate = function() {
      $mdDialog.cancel();
    };

  }
]);
