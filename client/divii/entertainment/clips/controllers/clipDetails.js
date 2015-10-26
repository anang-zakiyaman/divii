angular
  .module("divii")
  .controller("ClipDetailsCtrl", [
    '$rootScope','$scope', '$stateParams', '$sce', '$meteor',
    function($rootScope, $scope, $stateParams, $sce, $meteor){

      $meteor.subscribe('userOrders', $rootScope.currentUser._id).then(function(){
        $scope.orders = $meteor.collection(function(){
            return Orders.find({owner:$rootScope.currentUser._id});
        });
      });

      $meteor.subscribe('movies');
      $scope.movie = Movies.findOne($stateParams.movieId);
      $scope.player = null;
      $scope.isPlayingVideoAds = true;
      $scope.showVideoPlayer = false;
      $scope.showInitButton = false;

      videojs("divii_video", {
          "poster": $rootScope.contentServer+'/img/divii-background.jpg',
          "preload": "auto"})
      // set initial video ads
      .src($rootScope.contentServer+'/ads/video/ads1.mp4')
      .ready(function(){
        $scope.player = this;
        $scope.player.poster($rootScope.contentServer+'/img/divii-background.jpg');
        $scope.player.on("ended", function(){
          if($scope.isPlayingVideoAds){
            $scope.isPlayingVideoAds = false;
            $scope.player.src({ type: "video/mp4", src: $rootScope.contentServer+"/index-stream.php"});
            $scope.player.play();
            $scope.player.controls(true);
          }
        });
        $scope.showInitButton = true;
      });

      $scope.$on('$destroy',function(){
        if($scope.player) $scope.player.dispose();
      });

      $scope.initVideoPlayer = function(){
        $scope.showInitButton = false;
        $scope.showVideoPlayer = true;
        if($scope.player) $scope.player.play();
	    };
    }
  ]);
