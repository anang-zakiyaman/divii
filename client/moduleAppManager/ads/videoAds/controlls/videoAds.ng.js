angular.module("divii")
.controller("AppVideoAdsManagerCtrl", ["$scope", "$meteor", '$mdDialog', '$mdToast',
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

    $scope.$meteorSubscribe('videoAdsContent');

    $scope.$meteorAutorun(function(){
      $scope.$meteorSubscribe('videoAds',{
        limit: parseInt($scope.getReactively('perPage')),
        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        sort: $scope.getReactively('sort')
      }, $scope.getReactively('searchKey'))
      .then(function(){
        $scope.videoAdsCount = $scope.$meteorObject(Counts, 'numberOfVideoAds', false);
        if(!$scope.videoAds){
          $scope.videoAds = $scope.$meteorCollection(VideoAds, false);
        }
      });
    });

    $scope.updateVideoAds = function(target, videoAdId){
      $mdDialog.show({
        controller: 'VideoAdUpdateDialogCtrl',
        templateUrl: 'client/moduleAppManager/templates/views/video-ad-update-dialog.ng.html',
        locals: {videoAdId: videoAdId},
        parent: angular.element(document.body),
        targetEvent: target
      })
      .then(function(videoAdCode) {
        successToast(videoAdCode + ' updated ');
      });
    };

    $scope.removeVideoAds = function(target, videoAd){
      var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Are your sure want to delete this image ad?')
      .content(imageAd.code+' will be removed')
      .ariaLabel('confirm remove image ad')
      .ok('Remove ad')
      .cancel('Cancel')
      .targetEvent(target);
      $mdDialog.show(confirm).then(function() {
        $scope.videoAds.remove(videoAd._Id).then(function(data) {
          successToast(videoAd.code + ' removed');
        }, function(error) {
          failToast('failed to remove '+ videoAd.code);
        });
      });
    };

    $scope.adVideoUrl = function(videoAdsContentId){
      var adVideo = VideoAdsContent.findOne({_id:videoAdsContentId});
      return adVideo.url({store: 'videoAdsContent'});
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
