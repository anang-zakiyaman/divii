angular.module("divii")
.controller("AppBaseCtrl", ["$scope", "$state", "$mdSidenav", "$location",
  function($scope, $state, $mdSidenav, $location) {

    $scope.navigateToPage = function(targetState) {
      $state.go(targetState);
    };
    $scope.toggleSidenav = function(componentId) {
      $mdSidenav(componentId).toggle();
    };
    $scope.linkIsActive = function(path) {
      return $location.path().substr(0, path.length) == path;
    };

  }
]);
