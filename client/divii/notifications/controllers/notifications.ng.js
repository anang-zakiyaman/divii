angular
  .module("divii")
  .controller("NotificationsCtrl", [
    "$scope", "$rootScope", "$state", "$meteor","$mdSidenav",

  function($scope, $rootScope, $state, $meteor, $mdSidenav){

    $meteor.subscribe('userOrders', $rootScope.currentUser._id).then(function(){
      $scope.orders = $meteor.collection(function(){
          return Orders.find({owner:$rootScope.currentUser._id});
      });
    });

    // $meteor.subscribe('notifications');
    // $scope.notifications = $meteor.collection(Notifications);

  }

]);
