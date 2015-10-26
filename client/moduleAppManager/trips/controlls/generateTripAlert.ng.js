angular.module("divii")
.controller("AppGenerateTripAlertManagerCtrl", ["$scope", "$meteor", '$state', '$mdDialog', '$mdToast',
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
    $scope.sort = {sequenceNo: 1};

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('stations',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.stationsCount = $scope.$meteorObject(Counts, 'numberOfStations', false);
        if(!$scope.stations){
          $scope.stations = $scope.$meteorCollection(Stations, false);
        }
      });
    });

    $scope.$meteorSubscribe('tripAlerts').then(function(){
      $scope.tripAlerts = $scope.$meteorCollection(TripAlerts, false);
    });

    $scope.nextStopAlert = function(target, station){
      var alertContent = 'Pemberhentian berikutnya di '+ station.name + ', ' + station.location.city;
      var alert = { createdAt: '', category: 'nextStop', content: alertContent };
      publishAlert(target, alert);
    };

    // default Eta
    $scope.eta = 15;
    $scope.etaAlert = function(target, station, eta){
      var alertContent = 'Akan tiba di '+ station.name + ', ' + station.location.city + ' dalam ' + eta + ' menit';
      var alert = { createdAt: '', category: 'eta', content: alertContent };
      publishAlert(target, alert);
    };

    $scope.arrivalAlert = function(target, station){
      var alertContent = 'Tiba di '+ station.name + ', ' + station.location.city;
      var alert = { createdAt: '', category: 'arrival', content: alertContent };
      publishAlert(target, alert);
    };

    var publishAlert = function(target, alert){
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('New alert')
        .content(alert.content)
        .ariaLabel(alert.content)
        .ok('Publish')
        .cancel('Cancel')
        .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        alert.createdAt = new Date().valueOf();
        $scope.tripAlerts.save(alert).then(function(numberOfDocs){
          successToast('alert published');
          $state.go('appManager.tripAlerts');
        }, function(error){
          failToast('failed to publish alert');
        });
      }, function(error) {
        failToast('cancel creating alert');
      });
    };


    $scope.customTripAlert = function(target){
      $mdDialog.show({
        controller: 'AppCustomTripAlertDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/custom-trip-alert-dialog.ng.html',
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function() {
        successToast('custom alert published');
      });
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };

  }
]);
