angular.module("divii")
.controller("AppImageAdsCtrl", ["$scope", "$meteor", '$stateParams', '$mdDialog', '$mdToast',
  function($scope, $meteor, $stateParams, $mdDialog, $mdToast) {

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

    $scope.searchKey = $stateParams.spaceCode;

    // Pagination
    $scope.page = 1;
    $scope.perPage = 5;
    $scope.sort = {activeDate: -1};

    $scope.$meteorSubscribe('adsSpaces').then(function(){
      $scope.adsSpaces = $scope.$meteorCollection(function(){
        return AdsSpaces.find({}, { fields: {'code': 1, 'type': 1} });
      }, false);
    });

    $scope.$meteorSubscribe('imageAdsContent');

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('imageAds',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('spaceCode'), $scope.getReactively('searchKey'))
      .then(function(){
        $scope.imageAdsCount = $scope.$meteorObject(Counts, 'numberOfImageAds', false);
        if(!$scope.imageAds){
          $scope.imageAds = $scope.$meteorCollection(ImageAds, false);
        }
      });
    });

    $scope.updateImageAds = function(target, imageAdId){
      $mdDialog.show({
        controller: 'ImageAdUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/image-ad-update-dialog.ng.html',
        locals: {imageAdId: imageAdId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(imageAdCode) {
        successToast(imageAdCode + ' updated ');
      });
    };

    $scope.removeImageAds = function(target, imageAd){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this image ad?')
      .content(imageAd.code+' will be removed')
      .ariaLabel('confirm remove image ad')
      .ok('Remove ad')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $scope.imageAds.remove(imageAd._Id).then(function(data) {
          successToast(imageAd.code + ' removed');
        }, function(error) {
          failToast('failed to remove '+ imageAd.code);
        });
      });
    };

    $scope.adImageUrl = function(imageAdsContentId){
      var adImage = ImageAdsContent.findOne({_id:imageAdsContentId});
      return adImage.url({store: 'imageAdsContent'});
    }

    $scope.isActive = function(activeDate, expireDate){
      var currentDate = new Date();
      var activeDate = new Date(activeDate);
      var expireDate = new Date(expireDate);
      return activeDate < currentDate && currentDate < expireDate;
    }

    $scope.clearFilter = function() {
      $scope.searchKey = '';
    };

    $scope.pageChanged = function(newPage){
      $scope.page = newPage;
    };
  }
]);
