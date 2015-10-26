angular
  .module("divii")
  .controller("DiviiHomeCtrl", [
    "$scope", "$rootScope", "$state", "$meteor","$mdSidenav",
  function($scope, $rootScope, $state, $meteor, $mdSidenav) {

    // $meteor.subscribe('userOrders', $rootScope.currentUser._id).then(function(){
    //   $scope.orders = $meteor.collection(function(){
    //       return Orders.find({owner:$rootScope.currentUser._id});
    //   });
    // });

    // if($rootScope.currentUser){
    //   $meteor.autorun($rootScope, function(){
    //     $meteor.subscribe('userOrders', $rootScope.currentUser._id).then(function(){
    //         $rootScope.numberOfOrders = $meteor.object(Counts, 'numberOfOrders', false);
    //     });
    //   });
    // }

    $scope.menus = [
      {title: "Movies", icon:"av:ic_movie_24px", state:"movies", color:"#fff", iconColor:"#DB5800"},
      {title: "Clips and talks", icon:"av:ic_video_collection_24px", state:"clips", color:"#fff", iconColor:"#FF9000"},
      {title: "Foods and drinks", icon:"maps:ic_local_restaurant_24px", state:"foodMenu", color:"#fff", iconColor:"#F0C600"},
      {title: "Orders", icon:"action:ic_shopping_cart_24px", state:"orders", color:"#fff", iconColor:"#8EA106"},
      {title: "Notifications", icon:"social:ic_notifications_24px", state:"notif", color:"#fff", iconColor:"#DB5800"},
      {title: "Partners and sponsors", icon:"social:ic_mood_24px", state:"partners", color:"#fff", iconColor:"#FF9000"},
    ];

    $scope.goTo = function(state){
      $state.go(state);
    };

  }

]);
