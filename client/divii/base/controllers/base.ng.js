angular.module("divii")
.controller("DiviiBaseCtrl", ["$scope", "$state", "$mdSidenav", "$location",
  function($scope, $state, $mdSidenav, $location) {

    $scope.lockSidenavEnabled = true;

    $scope.navigateToPage = function(targetState) {
      $state.go(targetState);
    };
    $scope.toggleSidenav = function(componentId) {
      $mdSidenav(componentId).toggle();
    };
    $scope.closeSidenav = function(componentId){
      $mdSidenav(componentId).close();
    };
    $scope.disableLockSidenav = function(){
      $scope.lockSidenavEnabled = false;
    };
    $scope.enableLockSidenav = function(){
      $scope.lockSidenavEnabled = true;
    };
    $scope.linkIsActive = function(path) {
      return $location.path().substr(0, path.length) == path;
    };

  }
]);
