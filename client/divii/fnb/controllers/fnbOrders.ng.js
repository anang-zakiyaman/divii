angular
  .module("divii")
  .controller("FnbOrdersCtrl", [
    "$scope", "$rootScope", "$state", "$meteor","$mdSidenav",

  function($scope, $rootScope, $state, $meteor, $mdSidenav){

    $meteor.subscribe('userOrders', $rootScope.currentUser._id).then(function(){
      $scope.orders = $meteor.collection(function(){
          return Orders.find({owner:$rootScope.currentUser._id});
      });
    });

    $scope.removeOrder = function(order){
      $scope.orders.remove(order);
    }

  }

]);
