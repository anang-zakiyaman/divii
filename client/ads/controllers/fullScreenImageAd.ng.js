angular.module("divii")
.controller("FullScreenImageAdCtrl", ["$rootScope", "$scope", "$state", "$meteor", '$stateParams', '$mdToast', '$interval',
  function($rootScope, $scope, $state, $meteor, $stateParams, $mdToast, $interval) {

    $scope.waitMessage = $stateParams.waitMessage;
    $scope.durationCount = 0;

    $scope.$meteorSubscribe('imageAd', $stateParams.targetSpace).then(function(){
      $scope.imageAd = $scope.$meteorObject(ImageAds, {'targetSpace': $stateParams.targetSpace}, false);
      $scope.$meteorSubscribe('imageAdsContent').then(function(){
          $scope.adImageUrl = $scope.imageAd.image.url({store: 'imageAdsContent'});
      });
      // updateUserImageAdViews($scope.imageAd);
      // updateImageAdView($scope.imageAd);
      $meteor.call('serverUpdateUserAdViews', 'image', $scope.imageAd.code);
      $meteor.call('serverUpdateImageAdViews', $scope.imageAd.code, window.navigator.userAgent);
      startDurationCount();
    });

    var updateImageAdView = function(imageAd){
      $scope.$meteorSubscribe('imageAdViews').then(function(){
        var existingView = $scope.$meteorObject(ImageAdViews, {
          adCode: imageAd.code,
          userId: $rootScope.currentUser._id
        }, true);
        if(existingView._id){
          // if user alrady view the image ad previously, add view count
          existingView.count++;
        } else {
          // first time user view the image ad
          ImageAdViews.insert({
            adCode: imageAd.code,
            userId: $rootScope.currentUser._id,
            name: $rootScope.currentUser.profile.name,
            gender: $rootScope.currentUser.profile.gender,
            age: $rootScope.currentUser.profile.age,
            transportation:{
              operator: 'kai', media: 'train',
              vehicleCode : $rootScope.currentUser.profile.transportation.vehicleCode,
              ticket: $rootScope.currentUser.profile.transportation.ticket
            },
            userAgent: window.navigator.userAgent,
            count: 1
          });
        }
      });
    }

    var startDurationCount = function(){
      $mdToast.show({
        scope: $scope,
        templateUrl: 'client/divii/ads/views/timeout-toast.ng.html',
        hideDelay: 5000,
        position: 'bottom left'
      });
      var adTimeout = $interval(function(){
        if($scope.durationCount < 100){
          $scope.durationCount += 1;
        } else {
          closeFullscreenImageAd(adTimeout);
        }
      }, 50, 101);
    }

    var closeFullscreenImageAd = function(adTimeout){
      if (angular.isDefined(adTimeout)) {
        $interval.cancel(adTimeout);
        adTimeout = undefined;
      }
      $state.go($stateParams.nextState);
    }

  }
]);
