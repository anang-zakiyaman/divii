angular.module("divii")
.controller("AppUserOrdersManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
  function($scope, $meteor, $mdDialog, $mdToast) {

    /*
      For the sole purpose of avoiding extra loading time, this controller includes two use-cases
      which clearly could be separated into two separate controllers which are:
      1. manage user order items
      2. add new order items (selecting items from food and beverage menu list)
      fnb manager may switch between the above use cases oftenly, hence avoiding extra loading time
      is considered as higher priority.
    */

    // Initial subscriptions ============================================================
    $scope.$meteorSubscribe('foodItems').then(function(){
      var foodItems = $scope.$meteorCollection(FoodItems, true);
      $scope.foodItemSelections = foodItems.map(function(foodItem){
        var itemSelection = { selected: false, category: 'food', quantity: 0, item: foodItem };
        return itemSelection;
      });
    });

    $scope.$meteorSubscribe('beverageItems').then(function(){
      var beverageItems = $scope.$meteorCollection(BeverageItems, true);
      $scope.beverageItemSelections = beverageItems.map(function(beverageItem){
        var itemSelection = { selected: false, category: 'beverage', quantity: 0, item: beverageItem };
        return itemSelection;
      });
    });

    // scope variables ==================================================================

    $scope.headerText = 'Select passenger';
    $scope.noSeatSelection = true;
    $scope.showSeatSelection = true;
    $scope.noItemSelections = true;
    $scope.showItemSelections = false;
    $scope.itemSelectionCount = 0;
    $scope.totalSelectionPrice = 0;

    $scope.beverageOrderItems = null;
    $scope.foodOrderItems = null;
    var orderSubscriptionHandle = null;
    var orderItemsSubscriptionHandle = null;


    // private functions ================================================================

    var successToast = function(toastMsg){
      $mdToast.show({
        template: '<md-toast class="md-toast" style="background-color:#e74c3c;">' + toastMsg + '</md-toast>',
        hideDelay: 3000,
        position: 'top right'
      });
    }

    var failToast = function(toastMsg){
      $mdToast.show({
        template: '<md-toast class="md-toast md-warn" style="background-color:#e74c3c;">' + toastMsg + '</md-toast>',
        hideDelay: 3000,
        position: 'top right'
      });
    }

    var loadUserOpenOrders = function(orderOwner){
      // subscribe to selected seat's (/user's) order
      if(orderSubscriptionHandle) orderSubscriptionHandle.stop();
      $scope.$meteorSubscribe('userOrders',{sort: {cratedAt: -1}}, orderOwner, true)
      .then(function(subscriptionHandle){
        orderSubscriptionHandle = subscriptionHandle;
        // get user order where status is 'open', if any
        $scope.userOpenOrder = getOrder(orderOwner);
        if($scope.userOpenOrder._id){
          loadOrderItems($scope.userOpenOrder._id);
        }
      });
    };

    var loadOrderItems = function(orderId){
      //subcribe to order items of the user's open order
      if(orderItemsSubscriptionHandle) orderItemsSubscriptionHandle.stop();
      $scope.$meteorSubscribe('orderItems',{sort: {cratedAt: -1}}, orderId)
      .then(function(subscriptionHandle){
        orderItemsSubscriptionHandle = subscriptionHandle;
        $scope.orderItems = getOrderItems(orderId);
      });
    };

    var getOrder = function(orderOwner){
      return $scope.$meteorObject(Orders, {$and:[
        {'status.isOpen': true},
        {'owner.class': orderOwner.class},
        {'owner.coach': orderOwner.coach},
        {'owner.row': orderOwner.row},
        {'owner.seat': orderOwner.seat}
      ]}, false);
    };

    var getOrderItems = function(orderId){
      return $scope.$meteorCollection(function(){
        return OrderItems.find({orderId:orderId},{
          // get order items by it's itemId relations
          transform: function(orderItem){
            if(orderItem.category == 'food'){
              orderItem.item = FoodItems.findOne(orderItem.itemId);
            } else if(orderItem.category == 'beverage'){
              orderItem.item = BeverageItems.findOne(orderItem.itemId);
            }
            return orderItem;
          }
        });
      }, true);
    };

    var refreshPassengerOrderData = function(){
      // stop current subscriptions
      if(orderSubscriptionHandle) orderSubscriptionHandle.stop();
      if(orderItemsSubscriptionHandle) orderItemsSubscriptionHandle.stop();
      // stop current collections, this is important to avoid the increase in number of watchers.
      if($scope.userOpenOrder) {
        $scope.userOpenOrder.stop();
        delete $scope.userOpenOrder;
      }
      if($scope.orderItems) {
        $scope.orderItems.stop();
        delete $scope.orderItems;
      }
      // remove existing item selections, if any
      if(!$scope.noItemSelections){
        $scope.resetItemSelections();
      }
    };

    var newOrderObject = function(owner){
      return {
        createdAt: new Date().valueOf(),
        closedAt: '',
        paidAt: '',
        owner: owner,
        status: { isOpen: true, isPaid: false }
      };
    };

    var newOrderItemObject = function(orderId, itemId, category, price){
      return {
        orderId: orderId,
        createdAt: new Date().valueOf(),
        startedAt: '',
        readyAt: '',
        deliveredAt: '',
        category: category,
        itemId: itemId,
        price: price,
        status: { isStarted: false, isReady: false, isDelivered: false }
      }
    };

    $scope.setStatusAsStarted = function(orderItem){
      if(!orderItem.status.isStarted){
        console.log('set as started');
        orderItem.status.isStarted = true;
        orderItem.startedAt = new Date().valueOf();
      }
    };

    $scope.unsetStatusAsStarted = function(orderItem){
      if(orderItem.status.isStarted){
        // make sure "is ready" and "is delivered" are false
        // since this is their precondition requirement
        $scope.unsetStatusAsReady(orderItem);
        $scope.unsetStatusAsDelivered(orderItem);
        orderItem.startedAt = '';
        orderItem.status.isStarted = false;
      }
    };

    $scope.setStatusAsReady = function(orderItem){
      if(!orderItem.status.isReady){
        // make sure "is started" is true
        // since it's the precondition requirement for "is ready"
        $scope.setStatusAsStarted(orderItem);
        orderItem.readyAt = new Date().valueOf();
        orderItem.status.isReady = true;
      }
    };

    $scope.unsetStatusAsReady = function(orderItem){
      if(orderItem.status.isReady){
        // make sure "is delivered" is false
        // since this is it's precondition requirement
        $scope.unsetStatusAsDelivered(orderItem);
        orderItem.readyAt = '';
        orderItem.status.isReady = false;
      }
    }

    $scope.setStatusAsDelivered = function(orderItem){
      if(!orderItem.status.isDelivered){
        // make sure "is started" and "is delivered" are true
        // since it's their precondition requirement
        $scope.setStatusAsStarted(orderItem);
        $scope.setStatusAsReady(orderItem);
        orderItem.deliveredAt = new Date().valueOf();
        orderItem.status.isDelivered = true;
      }
    };

    $scope.unsetStatusAsDelivered = function(orderItem){
      if(orderItem.status.isDelivered){
        orderItem.deliveredAt = '';
        orderItem.status.isDelivered = false;
      }
    }

    $scope.setOrderStatusAsPaid = function(order){
      if(order.status.isOpen){
        if(!order.status.isPaid){
          order.paidAt = new Date().valueOf();
          order.status.isPaid = true;
        }
      }
    };

    $scope.unsetOrderStatusAsPaid = function(order){
      if(order.status.isOpen){
        if(orderItem.status.isPaid){
          orderItem.paidAt = '';
          orderItem.status.isPaid = false;
        }
      }
    };

    var setOrderStatusAsOpen = function(order){
      if(!order.status.isOpen){
        order.closedAt = '';
        order.status.isOpen = true;
      }
    }

    var setOrderStatusAsClosed = function(order){
      if(order.status.isOpen){
        order.closedAt = new Date().valueOf();
        order.status.isOpen = false;
      }
    };

    var addTotalSelectionPrice = function(quantity, itemPrice){
      $scope.totalSelectionPrice += parseInt(quantity) * parseInt(itemPrice);
    };

    var reduceTotalSelectionPrice = function(quantity, itemPrice){
      $scope.totalSelectionPrice -= parseInt(quantity) * parseInt(itemPrice);
    };

    // scope functions =====================================================================

    $scope.selectSeat = function(){
      var orderOwner = $scope.selectedSeat;
      refreshPassengerOrderData();
      loadUserOpenOrders(orderOwner);
      $scope.noSeatSelection = false;
      $scope.headerText = orderOwner.class.substring(0, 3).toUpperCase() + orderOwner.coach + '-' + orderOwner.row + orderOwner.seat;
    };

    $scope.unselectItem = function(itemSelection){
        itemSelection.selected = false;
        itemSelection.item.quantity += itemSelection.quantity;
        reduceTotalSelectionPrice(itemSelection.quantity,itemSelection.item.price);
        itemSelection.quantity = 0;
        if($scope.itemSelectionCount == 0) $scope.noItemSelections = true;
        else $scope.itemSelectionCount--;
    };

    $scope.selectItem = function(itemSelection){
      if(itemSelection.item.quantity && itemSelection.item.quantity > 0){
        $scope.noItemSelections = false;
        itemSelection.selected = true;
        itemSelection.quantity = 1;
        itemSelection.item.quantity--;
        $scope.itemSelectionCount++;
        addTotalSelectionPrice(1,itemSelection.item.price);
      }
    };

    $scope.addItemSelectionQuantity = function(itemSelection){
      if(itemSelection.item.quantity > 0){
        itemSelection.item.quantity--;
        itemSelection.quantity++;
        addTotalSelectionPrice(1,itemSelection.item.price);
      }
    };

    $scope.reduceItemSelectionQuantity = function(itemSelection){
      if(itemSelection.quantity > 0){
        if(itemSelection.quantity == 1){
          $scope.unselectItem(itemSelection);
        } else {
          itemSelection.quantity--;
          itemSelection.item.quantity++;
          reduceTotalSelectionPrice(1,itemSelection.item.price);
        }
      }
    };

    $scope.resetItemSelections = function(){
      for(var i = 0; i < $scope.foodItemSelections.length; ++i) {
          var itemSelection = $scope.foodItemSelections[i];
          if(itemSelection.selected) $scope.unselectItem(itemSelection);
      }
      for(var i = 0; i < $scope.beverageItemSelections.length; ++i) {
          var itemSelection = $scope.beverageItemSelections[i];
          if(itemSelection.selected) $scope.unselectItem(itemSelection);
      }
    };

    $scope.saveItemSelections = function(){
      // make sure the intended seat is selected and
      // there are items selected to be added
      if(!$scope.noSeatSelection && !$scope.noItemSelections){
        // check if the current selected seat has already an open order
        if($scope.userOpenOrder._id){
          insertNewOrderItems($scope.userOpenOrder._id);
        } else {
          // create new order if user doesn't have any open order
          Orders.insert(newOrderObject($scope.selectedSeat), function(error, orderId){
            if(error) console.log('error new order: '+ error);
            else {
              $scope.userOpenOrder = $scope.$meteorObject(Orders, orderId, false);
              // subscribe to the new order's order items
              if(orderItemsSubscriptionHandle) orderItemsSubscriptionHandle.stop();
              $scope.$meteorSubscribe('orderItems',{sort: {cratedAt: -1}}, orderId)
              .then(function(){
                insertNewOrderItems(orderId);
              });
            }
          });
        }
      }
    };

    var insertNewOrderItems = function(orderId){
      if(orderId){
        var selectedItems = [];
        // add food and beverage selected items into selected item array
        pushSelectedItems(orderId, selectedItems, $scope.foodItemSelections);
        pushSelectedItems(orderId, selectedItems, $scope.beverageItemSelections);

        if(typeof $scope.orderItems === 'undefined' || $scope.orderItems == null){
          $scope.orderItems = getOrderItems(orderId);
        }
        // add the new item selections
        $scope.orderItems.save(selectedItems)
        .then(function(docs){
          // unselect all selections, a cleanup for next selection task
          $scope.resetItemSelections();
        }, function(error){
          console.log('error inserting order items: '+ error);
        });
      }
    }

    var pushSelectedItems = function(orderId, selectedItemList, itemSelections){
      for(var i = 0; i < itemSelections.length; ++i) {
        var itemSelection = itemSelections[i];
        if(itemSelection.selected) {
          for(var j = 0; j < itemSelection.quantity; ++j){
            selectedItemList.push(newOrderItemObject(orderId, itemSelection.item._id, itemSelection.category, itemSelection.item.price));
          }
        }
      }
    }

    $scope.cancelOrderItem = function(target, orderItem){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to cancel this item?')
      .content(orderItem.title+' will be canceled')
      .ariaLabel('confirm cancel item')
      .ok('Remove item')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $scope.orderItems.remove(orderItem._id)
        .then(function(data) {
          successToast(orderItem.title + ' canceled');
        }, function(error) {
          failToast('failed to cancel '+ orderItem.title);
        });
      });
    };

    $scope.openActionBar = function(itemId){
      $scope.opennedItemAction = itemId;
    }
    $scope.closeActionBar = function(){
      $scope.opennedItemAction = null;
    }

  }
]);
