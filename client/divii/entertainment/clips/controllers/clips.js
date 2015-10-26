angular
  .module("divii")
  .controller("ClipsCtrl", [
    "$scope", "$rootScope", "$state", "$meteor","$mdSidenav",

  function($scope, $rootScope, $state, $meteor, $mdSidenav){

    $meteor.subscribe('userOrders', $rootScope.currentUser._id).then(function(){
      $scope.orders = $meteor.collection(function(){
          return Orders.find({owner:$rootScope.currentUser._id});
      });
    });

    $meteor.subscribe('clips');
    $scope.clips = $meteor.collection(Clips);
    $scope.selectedTabIndex = 0;

    $scope.selectedClip = null;
    $scope.player = null;
    $scope.isPlayingVideoAds = null;
    $scope.showVideoPlayer = false;

    $scope.selectClip = function(clipId){
      $scope.selectedClip = Clips.findOne(clipId);
      $scope.playAd();
    }

    $scope.initVideoPlayer = function(){
      videojs("divii_video", {
        "poster": $rootScope.contentServer+'/img/divii-background.jpg',
        "preload": "auto"
      })
      .ready(function(){
        $scope.player = this;
        $scope.player.on("ended", $scope.onPlayEnded);
        $scope.playAd();
      });
    };

    $scope.playAd = function(){
      if($scope.selectedClip){
        if($scope.player){
          $scope.isPlayingVideoAds = true;
          $scope.showVideoPlayer = true;
          $scope.selectedTabIndex = 2;
          $scope.player.src($rootScope.contentServer+'/ads/video/ads1.mp4');
          $scope.player.play();
        } else {
          $scope.initVideoPlayer();
        }
      }
    };

    $scope.playClip = function(){
      if($scope.selectedClip) {
        $scope.isPlayingVideoAds = false;
        $scope.player.src({ type: "video/mp4", src: $rootScope.contentServer+"/index-stream.php"});
        $scope.player.play();
        $scope.player.controls(true);
      }
    };

    $scope.onPlayEnded = function(){
      if($scope.isPlayingVideoAds){
        $scope.playClip();
      } else {
        $scope.player.stop();
        $scope.selectedTabIndex = 0;
        $scope.showVideoPlayer = false;
      }
    }

    $scope.$on('$destroy',function(){
      if($scope.player) $scope.player.dispose();
    });

  }

]);
