angular.module("divii")
.controller("AppImageAdsSpacesCtrl", ["$scope", "$state", "$meteor", '$mdDialog', '$mdToast',
  function($scope, $state, $meteor, $mdDialog, $mdToast) {

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

    $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.overlayAdsSpaces = $meteor.collection(function(){
      return AdsSpaces.find({'type':'overlay'});
    }, false).subscribe('adsSpace');

    $scope.$meteorSubscribe('adsSpaces').then(function(){
      // $scope.overlayAdsSpaces = $scope.$meteorCollection(function(){
      //   return AdsSpaces.find({'type':'overlay'});
      // }, false);
      $scope.interstitialAdsSpaces = $scope.$meteorCollection(function(){
        return AdsSpaces.find({'type':'interstitial'});
      }, false);
      $scope.sponsorshipAdsSpaces = $scope.$meteorCollection(function(){
        return AdsSpaces.find({'type':'sponsorhip'});
      }, false);
    });

    $scope.viewAds = function(spaceCode){
      $state.go('appManager.imageAds',{spaceCode:spaceCode});
    }

    $scope.updateSpace = function(target, adsSpaceId){
      $mdDialog.show({
        controller: 'AdsSpaceUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/ads-space-update-dialog.ng.html',
        locals: {adsSpaceId: adsSpaceId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(adsSpaceTitle) {
        successToast(adsSpaceTitle + ' updated ');
      });
    };

    $scope.createSpace = function(target){
      $mdDialog.show({
        controller: 'AdsSpaceCreateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/ads-space-create-dialog.ng.html',
        locals: {adsSpaces: $scope.$meteorCollection(AdsSpaces, false)},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(adsSpaceTitle) {
        successToast(adsSpaceTitle + ' added to list');
      });
    };

    $scope.removeAdsSpace = function(target, adsSpace){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this account?')
      .content(adsSpace.title+' will be removed')
      .ariaLabel('confirm remove account')
      .ok('Remove account')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $scope.$meteorCollection(AdsSpaces, false).remove(adsSpace._Id).then(function(data) {
          successToast(adsSpace.title + ' removed');
        }, function(error) {
          failToast('failed to remove '+ adsSpace.title);
        });
      });
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };

  }
]);
