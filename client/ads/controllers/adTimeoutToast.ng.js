angular.module("divii")
.controller("AdTimeoutToastCtrl", ['$scope', 'toastMessage',
  function($scope, toastMessage) {

    //$scope.durationCount = 0;
    $scope.toastMessage = toastMessage;
    //startDurationCount();

    // var startDurationCount = function(){
    //   var adTimeout = $interval(function(){
    //     if($scope.durationCount < 100){
    //       $scope.durationCount++;
    //     } else {
    //       //timeoutCallback();
    //       $interval.cancel(adTimeout);
    //       adTimeout = undefined;
    //     }
    //   }, duration/100, 101);
    // };

  }
]);
