angular.module('divii')
.factory("imageAdLoader",['$q', '$meteor', '$mdToast', '$interval', 'imagesPreloader',
function($q, $meteor, $mdToast, $interval, imagesPreloader){
  return {
    getImageAd: function(adSpace){
      return $meteor.call('serverGetImageAdOnSpace', adSpace)
      .then(function(imageAd){
        // $meteor.call('serverUpdateUserAdViews', 'image', imageAd.code);
        // $meteor.call('serverUpdateImageAdViews', imageAd.code, window.navigator.userAgent);
        return imageAd;
      });
    },
    setAdTimeout: function(duration){
      var deferred = $q.defer();
      var durationCount = 0;
      var timeout = $interval(function(){
        if(durationCount < 100) durationCount++;
        else {
          deferred.resolve(true);
          $interval.cancel(timeout);
          timeout = undefined;
        }
      }, duration/100, 101);
      return deferred.promise;
    },
    setAdTimeoutWithToast: function(duration, toastMessage){
      return $mdToast.show({
        controller: 'AdTimeoutToastCtrl',
        locals: { toastMessage: toastMessage },
        templateUrl: 'client/ads/views/ad-timeout-toast.ng.html',
        hideDelay: duration,
        position: 'bottom right'
      });
    },
    preloadImageAd: function(imageUrl){
      return imagesPreloader.preloadImages([imageUrl]);
    }
  };
}]);
