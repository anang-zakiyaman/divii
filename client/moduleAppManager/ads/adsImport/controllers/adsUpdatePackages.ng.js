angular.module("divii")
.controller("AppAdsUpdatePackagesCtrl", ["$scope", "$state", "$meteor", '$mdDialog', '$mdToast',
  function($scope, $state, $meteor, $mdDialog, $mdToast) {

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

    $scope.$meteorSubscribe('adsUpdatePackages').then(function(){
        $scope.adsUpdatePackages = $meteor.collectionFS(AdsUpdatePackages, false);
    });

    $scope.opennedItemAction = null;
    $scope.openActionBar = function(itemId){
      $scope.opennedItemAction = itemId;
    }
    $scope.closeActionBar = function(){
      $scope.opennedItemAction = null;
    }

    $scope.uploadPackage = function(){
      var importElement = angular.element(document.querySelector('#file-input'))[0];
      AdsUpdatePackages.insert(importElement.files[0], function(error, fileObj){
      });
    }

    $scope.publishPackageContent = function(packageId){
      $meteor.call('serverPublishAdsUpdate', packageId)
      .then(function(data) {
        console.log(data);
        if(data.updatedImageAds.length || data.updatedVideoAds.length){
          $scope.adsUpdatePackages.remove(packageId);
          successToast('new ads published, removing update package ...');
        }
      }, function(error) {
        failToast('failed to publish new ads');
      });
    }

    $scope.removePackage = function(target, packageId){
      $scope.adsUpdatePackages.remove(packageId);
    }

  }
]);
