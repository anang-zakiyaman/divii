angular
  .module("divii")
  .controller("FnbMenuCtrl", [
    "$scope", "$rootScope", "$state", "$meteor","$mdSidenav", "$mdDialog", "$mdToast",

  function($scope, $rootScope, $state, $meteor, $mdSidenav, $mdDialog, $mdToast){

    $meteor.subscribe('foodMenu');
    $scope.foodMenu = $meteor.collection(FoodMenu);

    $meteor.subscribe('userOrders', $rootScope.currentUser._id).then(function(){
      $scope.orders = $meteor.collection(function(){
          return Orders.find({owner:$rootScope.currentUser._id});
      });
    });

    $scope.addOrder = function(menuItem){

      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Tambah pesanan')
        .content('Masukan "'+menuItem.title+'" kedalam daftar pesanan')
        .ariaLabel('Pesan')
        .ok('Ya')
        .cancel('Tidak');
      $mdDialog.show(confirm).then(function() {
        $scope.orders.push({
          owner: $rootScope.currentUser._id,
          item: menuItem,
          status: 'waiting'
        });
        $mdToast.show({
            template: '<md-toast class="md-toast">Pesanan ditambahkan</md-toast>',
            hideDelay: 3000,
            position: 'bottom left'
        });
      }, function() {

      });

    };
  }

]);
