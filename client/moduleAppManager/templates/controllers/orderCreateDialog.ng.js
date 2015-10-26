angular.module("divii")
.controller("AppOrderCreateDialogCtrl", ["$scope", "$meteor", "$mdDialog", "orders", "owner",
  function($scope, $meteor, $mdDialog, orders, owner){

    $scope.order = {
      cratedAt: '',
      owner: {
        passengerId: '',
        class: owner.class,
        coach: owner.coach,
        seatRow: owner.seatRow,
        seatColumn: owner.seatColumn
      },
      status: {
        isPaid: false,
        isReady: false,
        isDelivered: false
      },
      orderItems: []
    };

    var createOrderItem = function(category){
      return {
        category: category,
        itemId: '',
        price: ''
      }
    }

    $scope.$meteorSubscribe('foodItems').then(function(){
      $scope.foodItems = $scope.$meteorCollection(FoodItems, false);
    });

    $scope.$meteorSubscribe('beverageItems').then(function(){
      $scope.beverageItems = $scope.$meteorCollection(BeverageItems, false);
    });

    $scope.addOrderQuantity = function(item){
      if(typeof item.orderQuantity === "undefined") item.orderQuantity = 0;
      if(item.quantity > 0){
        item.quantity--;
        item.orderQuantity++;
      }
    };

    $scope.reduceOrderQuantity = function(item){
      if(typeof item.orderQuantity === "undefined") item.orderQuantity = 0;
      if(item.orderQuantity > 0){
        item.orderQuantity--;
        item.quantity++;
      }
    };

    $scope.createOrder = function() {
      orders.save($scope.order).then(function(numberOfDocs){
        $mdDialog.hide($scope.owner);
      }, function(error){
        $scope.errMsg = error;
      });
    };

    $scope.cancelCreate = function() {
      $mdDialog.cancel();
    };

  }
]);
