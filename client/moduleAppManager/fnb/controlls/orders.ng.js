angular.module("divii")
.controller("AppOrdersManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
  function($scope, $meteor, $mdDialog, $mdToast) {

    $scope.opennedItemAction = null;
    $scope.openActionBar = function(itemId){
      $scope.opennedItemAction = itemId;
    }
    $scope.closeActionBar = function(){
      $scope.opennedItemAction = null;
    }

    function successToast(toastMsg){
      $mdToast.show({
        template: '<md-toast class="md-toast" style="background-color:#e74c3c;">' + toastMsg + '</md-toast>',
        hideDelay: 3000,
        position: 'top right'
      });
    }

    function failToast(toastMsg){
      $mdToast.show({
        template: '<md-toast class="md-toast md-warn" style="background-color:#e74c3c;">' + toastMsg + '</md-toast>',
        hideDelay: 3000,
        position: 'top right'
      });
    }

    $scope.searchKey = "";

    // Pagination
    $scope.page = 1;
    $scope.perPage = 5;
    $scope.sort = {activeDate: -1};

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('orders',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.ordersCount = $scope.$meteorObject(Counts, 'numberOfOrders', false);
        if(!$scope.orders){
          $scope.orders = $scope.$meteorCollection(Orders, true);
        }
      });
    });

    $scope.updateOrder = function(target, orderId){
      $mdDialog.show({
        controller: 'AppStationUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/order-update-dialog.ng.html',
        locals: {orderId: orderId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(orderCode) {
        successToast(orderCode + ' updated ');
      });
    };

    $scope.removeOrder = function(target, station){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to remove this station?')
      .content(station.name+' will be removed')
      .ariaLabel('confirm remove station')
      .ok('Remove station')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $scope.$meteorCollection(Stations, false).remove(station._Id).then(function(data) {
          successToast(station.name + ' removed');
        }, function(error) {
          failToast('failed to remove '+ station.name);
        });
      });
    };

    $scope.clearFilter = function() {
      $scope.searchKey = '';
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };

  }
]);
