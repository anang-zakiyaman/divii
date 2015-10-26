angular.module("divii")
.controller("AppTripAlertsManagerCtrl", ["$scope", "$meteor", '$state', '$mdDialog', '$mdToast',
  function($scope, $meteor, $state, $mdDialog, $mdToast) {

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
    $scope.perPage = 10;

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('tripAlerts',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: {createdAt: -1}
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.tripAlertsCount = $scope.$meteorObject(Counts, 'numberOfTripAlerts', false);
        if(!$scope.tripAlerts){
          $scope.tripAlerts = $scope.$meteorCollection(function(){
              return TripAlerts.find({}, {sort: {createdAt: -1}});
          }, false);
        }
      });
    });

    $scope.createTripAlert = function(){
      $state.go('appManager.generateTripAlert');
    }

    $scope.removeTripAlert = function(target, tripAlert){
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('Are your sure want to remove this alert?')
        .content('alert : "' + tripAlert.content + '" will be removed')
        .ariaLabel('confirm remove alert')
        .ok('Remove alert')
        .cancel('Cancel')
        .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $scope.tripAlerts.remove(tripAlert._id).then(function(data) {
          successToast('alert removed');
        }, function(error) {
          failToast('failed to remove alert');
        });
      });
    };

    $scope.removeAllTripAlerts = function(target){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to remove all alerts?')
      .content('all alert will be removed')
      .ariaLabel('confirm remove all alert')
      .ok('Remove all')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $scope.tripAlerts.remove().then(function(data) {
          successToast('all alerts removed');
        }, function(error) {
          failToast('failed removing all alerts');
        });
      });
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };

  }
]);
