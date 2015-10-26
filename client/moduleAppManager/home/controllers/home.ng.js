angular.module("divii")
.controller("AppHomeCtrl", ["$scope",
  function($scope) {
    $scope.menus = [
      {title: "Accounts", icon:"action:ic_account_circle_24px", state:"appManager.accounts"},
      {title: "Image Ads", icon:"image:ic_collections_24px", state:"appManager.imageAds"},
      {title: "Video Ads", icon:"action:ic_shop_two_24px", state:"appManager.videoAds"},
      {title: "Clips", icon:"av:ic_video_collection_24px", state:"appManager.clips"},
      {title: "Movies", icon:"av:ic_movie_24px", state:"appManager.movies"},
      {title: "Food and Beverages", icon:"maps:ic_local_restaurant_24px", state:"appManager.fnb"},
      {title: "Trips", icon:"maps:ic_directions_subway_24px", state:"appManager.trips"},
    ];
  }
]);
