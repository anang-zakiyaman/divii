angular
  .module("divii")
  .controller("MoviesCtrl", ["$scope", "$meteor", "$state", "firstTimeOnPage", "imageAdLoader", "imagesPreloader",
  function($scope, $meteor, $state, firstTimeOnPage, imageAdLoader, imagesPreloader){

    $scope.$meteorSubscribe('imageAds');
    $scope.$meteorSubscribe('imageAdsContent');
    $scope.$meteorSubscribe('movieCovers');
    $scope.showInitialAd = false;

    $scope.isFirstTime = firstTimeOnPage.isFirstTime($state.current.name);
    if($scope.isFirstTime){
      $scope.showInitialAd = true;
      imageAdLoader.getImageAd('ATO002').then(function(imageAd){
        $scope.initialImageAd = imageAd;
        imageAdLoader.setAdTimeoutWithToast(5000, 'loading movies')
        .then(function(){
          $scope.showInitialAd = false;
        });
      });
    }

    imageAdLoader.getImageAd('ATI001').then(function(imageAd){
      $scope.imageAd = imageAd;
    });

    $scope.$meteorSubscribe('movies').then(function(){
      $scope.movies = $scope.$meteorCollection(Movies, false);
    });

    $scope.selectMovie = function(movieId){
      $state.go('movieDetails',{movieId:movieId});
    }
  }
]);
