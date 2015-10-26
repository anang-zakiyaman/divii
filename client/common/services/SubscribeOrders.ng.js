// angular.module('divii')
//
// .factory('subscribeOrders', ['$rootScope','$meteor',
//   function($rootScope, $meteor) {
//     var subscription = null;
//     var subscribeOrders = {
//       subscribe: function(userId){
//         subscription = $meteor.subscribe('userOrders', userId);
//       },
//       orders: $meteor.collection(function(){
//           return Orders.find({owner:$rootScope.currentUser._id});
//       }),
//       numberOfOrders: orders.length
//     };
//     return subscribeOrders;
// }]);
